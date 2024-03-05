import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import SaleModel from "../models/SaleModel";
import ClientModel from "../models/ClientModel";
import ProductModel from "../models/ProductModel";
import Receipt from "../utils/Receipt";
import mailService from "../utils/mailer";
import { getClientChange, getClientNewTotal } from "../utils/clientUtils";
import {
  countProductsTotal,
  structureProductsForOrder,
} from "../utils/productUtils";
import problem from "../errorHandling/problem";
import { saleItem } from "../types/SaleTypes";

class SaleController {
  public static async get(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals;

    const sale = await SaleModel.get(id);
    if (!sale) {
      return next(problem(1002, req));
    }

    return res.status(200).json({
      status: "Success",
      body: {
        sale,
      },
    });
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    const { paid, sellerId, clientId, products } = res.locals;

    const productIds = products.map((product: saleItem) => product.id);

    try {
      await prisma.$transaction(async (tx) => {
        // Get prices and related info
        const productsFromDB = await ProductModel.getMany(productIds);

        // Structure order data
        const productsData = structureProductsForOrder(
          products,
          productsFromDB
        );

        // Count products total
        const saleTotal = countProductsTotal(productsData);
        if (paid < saleTotal) {
          throw new Error("Insufficient Funds:");
        }

        const change = getClientChange(paid, saleTotal);

        // Insert Order with Order Items
        const sale = await SaleModel.create(
          tx,
          paid,
          sellerId,
          clientId,
          productsData
        );

        // Update Client totalSpend
        const clientNewTotal = getClientNewTotal(
          sale.client.totalSpent,
          saleTotal
        );

        await ClientModel.updateTotalSpent(clientId, clientNewTotal, tx);

        // Update Products Stock
        await ProductModel.updateStock(sale.items, tx);

        // Send Digital Receipt
        const receipt = new Receipt(sale);
        await mailService.sendHtml(sale.client.email, receipt.toHTML());

        return res.status(200).json({
          status: "Success",
          body: {
            change,
            sale,
          },
        });
      });
    } catch (error: any) {
      const errMsg =
        error && error.message
          ? error.message
          : "An unexpected error occurred during transaction";

      console.log(errMsg);

      next(problem(1005, req));
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default SaleController;

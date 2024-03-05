import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { orderData } from "../types/receiptTypes";
import {
  PrismaTransactionalClient,
  saleItemToInsert,
} from "../types/SaleTypes";

class SaleModel {
  async get(id: number, products = false, client = false, seller = false) {
    return await prisma.sale.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: products,
          },
        },
        client,
        seller,
      },
    });
  }

  async create(
    tx: PrismaTransactionalClient,
    paid: number,
    sellerId: number,
    clientId: number,
    productsData: saleItemToInsert[]
  ): Promise<orderData> {
    try {
      // 1. Insert Sale
      const order = await tx.sale.create({
        data: {
          clientId,
          sellerId,
          items: {
            // Insert many SaleItems
            createMany: {
              data: productsData,
            },
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          client: true,
          seller: true,
        },
      });

      return order;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        switch (error.code) {
          case "P2003":
            throw new Error(
              "Invalid data provided. Client, Seller or Product with this id does not exist"
            );

          default:
            throw new Error("An error occurred during transaction:");
        }
      } else {
        throw new Error(error.message);
      }
    }
  }
}

export default new SaleModel();

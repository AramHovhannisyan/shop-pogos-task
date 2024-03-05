import { prisma } from "../config/prisma";
import { measureType } from "../types/ProductTypes";
import { PrismaTransactionalClient } from "../types/SaleTypes";
import { SaleItemWithProduct } from "../types/receiptTypes";

class ProductModel {
  async get(id: number) {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async create(
    title: string,
    price: number,
    measureType: measureType,
    count: number
  ) {
    return await prisma.product.create({
      data: {
        title,
        price,
        measureType,
        count,
      },
    });
  }

  async getMany(productIds: number[]) {
    return await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
  }

  async updateStock(
    orderItems: SaleItemWithProduct[],
    tx: PrismaTransactionalClient
  ) {
    for (const item of orderItems) {
      const newCount = item.product.count - item.count;
      const productId = item.product.id;

      try {
        await tx.product.update({
          where: {
            id: productId,
          },
          data: {
            count: newCount,
          },
        });
      } catch (error) {
        throw new Error(
          `This quantity is out of stock for product with id: ${productId}`
        );
      }
    }
  }
}

export default new ProductModel();

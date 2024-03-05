import { prisma } from "../config/prisma";
import { UpdateClientRequestBody } from "../types/ClientTypes";
import { PrismaTransactionalClient } from "../types/SaleTypes";

class ClientModel {
  static async get(id: number) {
    return await prisma.client.findUnique({
      where: {
        id,
      },
    });
  }

  static async getAll() {
    return await prisma.client.findMany();
  }

  static async create(name: string, email: string) {
    const client = await prisma.client.create({
      data: {
        name,
        email,
      },
    });

    return client;
  }

  static async update(id: number, body: UpdateClientRequestBody) {
    return await prisma.client.update({
      where: {
        id,
      },
      data: body,
    });
  }

  static async delete(id: number) {
    return await prisma.client.delete({
      where: {
        id,
      },
    });
  }

  static async updateTotalSpent(
    id: number,
    totalSpent: number,
    tx: PrismaTransactionalClient
  ) {
    return await tx.client.update({
      where: {
        id,
      },
      data: {
        totalSpent,
      },
    });
  }
}

export default ClientModel;

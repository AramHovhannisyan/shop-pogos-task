import { prisma } from "../config/prisma";

class SellerModel {
  public static async get(id: number) {
    return await prisma.seller.findUnique({
      where: {
        id,
      },
    });
  }

  public static async getAll() {
    return await prisma.seller.findMany();
  }

  public static async create(name: string) {
    return await prisma.seller.create({
      data: {
        name,
      },
    });
  }
}

export default SellerModel;

import { PrismaClient } from "@prisma/client";

export interface CreateSaleBody {
  sellerId: number;
  clientId: number;
  products: saleItem[];
}

export interface saleItem {
  id: number;
  count: number;
}

export interface saleItemWithPrice {
  id: number;
  count: number;
  price: number;
}

export interface saleItemToInsert {
  productId: number;
  count: number;
  price: number;
}

export type PrismaTransactionalClient = Parameters<
  Parameters<PrismaClient["$transaction"]>[0]
>[0];

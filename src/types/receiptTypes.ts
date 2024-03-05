import { Client, Product, SaleItem, Seller } from "@prisma/client";
import { measureType } from "./ProductTypes";

export interface receiptProductType {
  title: string;
  count: number;
  measureType: measureType;
}

export interface saleData {
  saleNumber: number;
  clientName: string;
  sellerName: string;
  totalSpent: number;
}

export interface SaleItemWithProduct extends SaleItem {
  product: Product;
}

export interface orderData {
  id: number;
  client: Client;
  seller: Seller;
  items: SaleItemWithProduct[];
}

export interface saleResponseType extends orderData {
  change: string;
}

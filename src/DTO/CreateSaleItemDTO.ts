import { saleItemWithPrice } from "../types/SaleTypes";

export default class CreateSaleItemDTO {
  productId: number;
  count: number;
  price: number;

  constructor(product: saleItemWithPrice) {
    const { id, count } = product;
    this.productId = id;
    this.count = count;
    this.price = product.price;
  }
}

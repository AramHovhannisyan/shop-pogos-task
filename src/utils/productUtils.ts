import { MeasureType, Product } from "@prisma/client";
import { saleItem, saleItemToInsert } from "../types/SaleTypes";
import CreateSaleItemDTO from "../dto/CreateSaleItemDTO";

export function getPriceByMeasureType(
  measureType: MeasureType,
  count: number,
  price: number
) {
  const generatedPrice =
    measureType === "gram" ? (price * count) / 1000 : price * count;

  return parseFloat(generatedPrice.toFixed(2));
}

export function countProductsTotal(products: saleItemToInsert[]) {
  return products.reduce((total, products) => {
    return total + products.price;
  }, 0);
}

export function structureProductsForOrder(
  products: saleItem[],
  productsFromDB: Product[]
) {
  return products.map((saleItem: saleItem) => {
    const singleProductFromDB = productsFromDB.find(
      (singleProduct) => singleProduct.id === saleItem.id
    );

    if (!singleProductFromDB) {
      throw new Error(`Product with provided id not found: ${saleItem.id}`);
    }

    const productPrice = getPriceByMeasureType(
      singleProductFromDB.measureType,
      saleItem.count,
      singleProductFromDB.price
    );

    const productWithPrice = {
      ...saleItem,
      price: productPrice,
    };

    return new CreateSaleItemDTO(productWithPrice);
  });
}

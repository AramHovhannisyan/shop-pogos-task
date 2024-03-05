import { orderData } from "../types/receiptTypes";

export default class Receipt {
  id;
  clientName;
  clientEmail;
  sellerName;
  products;

  constructor(saleData: orderData) {
    this.id = saleData.id;
    this.clientName = saleData.client.name;
    this.clientEmail = saleData.client.email;
    this.sellerName = saleData.seller.name;
    this.products = saleData.items.map((item) => ({
      id: item.id,
      title: item.product.title,
      count: item.count,
      measureType: item.product.measureType,
      price: item.price,
    }));
  }

  toJson() {
    return {
      seller: {
        name: this.sellerName,
      },
      client: {
        name: this.clientName,
        email: this.clientEmail,
      },
      products: this.products.map((product) => ({
        title: product.title,
        count: product.count,
        measureType: product.measureType,
        price: product.price,
      })),
    };
  }

  toHTML() {
    return `<div style="width: 600px; margin: 0 auto; text-align: center;">
              <div>
                <h3>Receipt: ${this.id}</h3>
              </div>
            
              <table style="border-collapse: collapse;
                            width: 80%;
                            margin: 20px auto;
                            background-color: #ffffff;
                            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
                <tbody>
                  <tr>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 12px; background-color: #f2f2f2;">Customer</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 12px; background-color: #f2f2f2;">Seller</th>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 12px;">${
                      this.clientName
                    }, ${this.clientEmail}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 12px;">${
                      this.sellerName
                    }</td>
                  </tr>
                </tbody>
              </table>
            
              <h3>Products</h3>
            
              <table style="border-collapse: collapse;
                            width: 80%;
                            margin: 20px auto;
                            background-color: #ffffff;
                            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
                <tbody>
                  <tr>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 12px; background-color: #f2f2f2;">Title</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 12px; background-color: #f2f2f2;">Size</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 12px; background-color: #f2f2f2;">Price</th>
                  </tr>
                  ${this.products.map(
                    (singleProduct) => `<tr>
                                          <td style="border: 1px solid #dddddd; text-align: left; padding: 12px;">${singleProduct.title}</td>
                                          <td style="border: 1px solid #dddddd; text-align: left; padding: 12px;">${singleProduct.count} ${singleProduct.measureType}</td>
                                          <td style="border: 1px solid #dddddd; text-align: left; padding: 12px;">$${singleProduct.price}</td>
                                        </tr>`
                  )}
                </tbody>
              </table>
            </div>`;
  }
}

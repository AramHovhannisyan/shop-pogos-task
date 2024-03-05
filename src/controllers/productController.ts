import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import problem from "../errorHandling/problem";

class productController {
  public static async get(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals;

    const product = await ProductModel.get(id);
    if (!product) {
      return next(problem(1002, req));
    }

    return res.status(200).json({
      status: "Success",
      body: {
        product,
      },
    });
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    const { title, price, measureType, count } = res.locals;

    try {
      const product = await ProductModel.create(
        title,
        price,
        measureType,
        count
      );

      return res.status(200).json({
        status: "Success",
        body: {
          product,
        },
      });
    } catch (error) {
      // Duplicate data
      return next(problem(1004, req));
    }
  }
}

export default productController;

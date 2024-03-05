import { NextFunction, Request, Response } from "express";
import SellerModel from "../models/SellerModel";
import problem from "../errorHandling/problem";

class sellerController {
  public static async get(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals;

    const seller = await SellerModel.get(id);

    if (!seller) {
      return next(problem(1002, req));
    }

    return res.status(200).json({
      status: "Success",
      body: {
        seller,
      },
    });
  }

  public static async getAll(_req: Request, res: Response) {
    const seller = await SellerModel.getAll();

    return res.status(200).json({
      status: "Success",
      body: {
        seller,
      },
    });
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    const { name } = res.locals;

    try {
      const seller = await SellerModel.create(name);

      return res.status(200).json({
        status: "Success",
        body: {
          seller,
        },
      });
    } catch (error) {
      // Duplicate data
      return next(problem(1004, req));
    }
  }
}

export default sellerController;

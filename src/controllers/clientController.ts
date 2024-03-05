import { NextFunction, Request, Response } from "express";
import ClientModel from "../models/ClientModel";
import problem from "../errorHandling/problem";

class clientController {
  public static async get(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals;

    const client = await ClientModel.get(id);
    if (!client) {
      return next(problem(1002, req));
    }

    return res.status(200).json({
      status: "Success",
      body: client,
    });
  }

  public static async getAll(_req: Request, res: Response) {
    const clients = await ClientModel.getAll();

    return res.status(200).json({
      status: "Success",
      body: {
        clients,
      },
    });
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    const { name, email } = res.locals;

    try {
      const client = await ClientModel.create(name, email);

      return res.status(200).json({
        status: "Success",
        body: {
          client,
        },
      });
    } catch (error) {
      console.log("error:", error);

      // Duplicate data
      return next(problem(1004, req));
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    const { id, name, email } = res.locals;

    try {
      const candidate = await ClientModel.get(id);

      if (!candidate) {
        return next(problem(1002, req));
      }

      const client = await ClientModel.update(id, { name, email });

      return res.status(200).json({
        status: "Success",
        body: {
          client,
        },
      });
    } catch (error) {
      next(problem(1004, req));
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals;

    try {
      await ClientModel.delete(id);

      return res.status(204).json({});
    } catch (error) {
      next(problem(1002, req));
    }
  }
}

export default clientController;

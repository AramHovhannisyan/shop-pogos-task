import { Request, Response, NextFunction } from "express";
import problem from "../errorHandling/problem";
import { validateSaleCreateRequest } from "../validators/validateCreateSaleRequest";

const validateSalePostRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateSaleCreateRequest(req.body);

  if (error) {
    return next(problem(1003, req));
  }

  const { paid, sellerId, clientId, products } = req.body;

  res.locals.paid = paid;
  res.locals.sellerId = sellerId;
  res.locals.clientId = clientId;
  res.locals.products = products;

  return next();
};

export default validateSalePostRequest;

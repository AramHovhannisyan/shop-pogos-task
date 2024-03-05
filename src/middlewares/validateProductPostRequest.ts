import { Request, Response, NextFunction } from "express";
import problem from "../errorHandling/problem";
import { validateProductCreateRequest } from "../validators/validateCreateProductRequest";

const validateProductPostRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateProductCreateRequest(req.body);

  if (error) {
    return next(problem(1003, req));
  }

  const { title, price, measureType, count } = req.body;

  res.locals.title = title;
  res.locals.price = price;
  res.locals.count = count;
  res.locals.measureType = measureType;

  return next();
};

export default validateProductPostRequest;

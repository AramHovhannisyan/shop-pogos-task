import { Request, Response, NextFunction } from "express";
import problem from "../errorHandling/problem";
import { validateSellerCreateRequest } from "../validators/validateCreateSellerRequest";

const validateSellerPostRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateSellerCreateRequest(req.body);

  if (error) {
    return next(problem(1003, req));
  }

  const { name } = req.body;

  res.locals.name = name;

  return next();
};

export default validateSellerPostRequest;

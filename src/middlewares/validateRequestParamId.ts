import { Request, Response, NextFunction } from "express";
import problem from "../errorHandling/problem";
import { validateParamsIdNumeric } from "../validators/validateGetClientRequest.ts";

const validateAndSetParamsId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateParamsIdNumeric(req.params);
  if (error) {
    return next(problem(1003, req));
  }

  const { id } = req.params;

  res.locals.id = +id;

  return next();
};

export default validateAndSetParamsId;

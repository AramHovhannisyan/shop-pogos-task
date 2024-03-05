import { Request, Response, NextFunction } from "express";
import problem from "../errorHandling/problem";
import { validateClientCreateRequest } from "../validators/validateUpdateClientRequest";

const validateClientUpdateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateClientCreateRequest(req.body);

  if (error) {
    return next(problem(1003, req));
  }

  const { name } = req.body;

  res.locals.name = name;
  res.locals.id = +req.params.id;

  return next();
};

export default validateClientUpdateRequest;

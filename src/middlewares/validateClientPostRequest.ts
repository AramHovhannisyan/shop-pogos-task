import { Request, Response, NextFunction } from "express";
import problem from "../errorHandling/problem";
import { validateClientCreateRequest } from "../validators/validateCreateClientRequest";

const validateClientRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateClientCreateRequest(req.body);

  if (error) {
    return next(problem(1003, req));
  }

  const { name, email } = req.body;

  res.locals.name = name;
  res.locals.email = email;

  return next();
};

export default validateClientRequestBody;

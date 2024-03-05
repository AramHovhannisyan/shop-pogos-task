import Joi from "joi";
import { CreateProductBody } from "../types/ProductTypes";

const createProductSchema = Joi.object().keys({
  title: Joi.string().required(),
  price: Joi.number().required(),
  measureType: Joi.string().valid("piece", "gram"),
  count: Joi.number().required(),
});

const validator = (schema: any) => (payload: CreateProductBody) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateProductCreateRequest = validator(createProductSchema);

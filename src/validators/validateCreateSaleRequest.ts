import Joi from "joi";
import { CreateSaleBody } from "../types/SaleTypes";

const createSaleSchema = Joi.object().keys({
  paid: Joi.number().required(),
  sellerId: Joi.number().required(),
  clientId: Joi.number().required(),
  products: Joi.array().items(
    Joi.object({
      id: Joi.number(),
      count: Joi.number(),
    })
  ),
});

const validator = (schema: any) => (payload: CreateSaleBody) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateSaleCreateRequest = validator(createSaleSchema);

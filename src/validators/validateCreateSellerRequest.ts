import Joi from "joi";
import { CreateSellerBodyType } from "../types/SellerTypes";

const createSellerSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const validator = (schema: any) => (payload: CreateSellerBodyType) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateSellerCreateRequest = validator(createSellerSchema);

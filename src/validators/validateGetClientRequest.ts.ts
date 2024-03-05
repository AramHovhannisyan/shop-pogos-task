import Joi from "joi";
import { GetClientRequestBody } from "../types/ClientTypes";

const numericParamsIdSchema = Joi.object().keys({
  id: Joi.number().integer().min(1).required(),
});

const validator = (schema: any) => (payload: GetClientRequestBody) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateParamsIdNumeric = validator(numericParamsIdSchema);

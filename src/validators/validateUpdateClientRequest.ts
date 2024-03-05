import Joi from "joi";
import { UpdateClientRequestBody } from "../types/ClientTypes";

const updateClientSchema = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string().email(),
  })
  .or("name", "email");

const validator = (schema: any) => (payload: UpdateClientRequestBody) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateClientCreateRequest = validator(updateClientSchema);

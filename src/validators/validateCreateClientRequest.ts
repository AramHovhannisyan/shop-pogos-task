import Joi from "joi";
import { CreateClientRequestBody } from "../types/ClientTypes";

const createClientSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const validator = (schema: any) => (payload: CreateClientRequestBody) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateClientCreateRequest = validator(createClientSchema);

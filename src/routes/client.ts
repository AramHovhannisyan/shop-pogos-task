import express from "express";
import clientController from "../controllers/clientController";
import validateAndSetParamsId from "../middlewares/validateRequestParamId";
import validateClientPostRequest from "../middlewares/validateClientPostRequest";
import validateClientUpdateRequest from "../middlewares/validateClientUpdateRequest";

const clientRoute = express.Router();

// CRUD routes for single Client
clientRoute
  .route("/:id")
  .get(validateAndSetParamsId, clientController.get)
  .put(validateClientUpdateRequest, clientController.update)
  .delete(validateAndSetParamsId, clientController.delete);

clientRoute
  .route("/")
  .get(clientController.getAll)
  .post(validateClientPostRequest, clientController.create);

export default clientRoute;

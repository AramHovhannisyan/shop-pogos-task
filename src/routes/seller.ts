import express from "express";
import sellerController from "../controllers/sellerController";
import validateAndSetParamsId from "../middlewares/validateRequestParamId";
import validateSellerPostRequest from "../middlewares/validateSellerPostRequest";

const sellerRoute = express.Router();

sellerRoute.route("/:id").get(validateAndSetParamsId, sellerController.get);

sellerRoute
  .route("/")
  .get(sellerController.getAll)
  .post(validateSellerPostRequest, sellerController.create);

export default sellerRoute;

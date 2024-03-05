import express from "express";
import SaleController from "../controllers/saleController";
import validateAndSetParamsId from "../middlewares/validateRequestParamId";
import validateSalePostRequest from "../middlewares/validateSalePostRequest";

const saleRoute = express.Router();

saleRoute.get("/:id", validateAndSetParamsId, SaleController.get);
saleRoute.post("/", validateSalePostRequest, SaleController.create);

export default saleRoute;

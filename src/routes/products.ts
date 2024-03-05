import express from "express";
import productController from "../controllers/productController";
import validateAndSetParamsId from "../middlewares/validateRequestParamId";
import validateProductPostRequest from "../middlewares/validateProductPostRequest";

const productRoute = express.Router();

productRoute.get("/:id", validateAndSetParamsId, productController.get);
productRoute.post("/", validateProductPostRequest, productController.create);

export default productRoute;

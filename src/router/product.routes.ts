import {
  addProductHandler,
  dropProductHandler,
  getAllProductHandler,
  getOneProductHandler,
  productFilterByHandler,
  productPaginateHandler,
  updateProductHandler,
} from "../controller/product.controller";
import { saveImg, saveImgs } from "../utils/gallary";
const productRoute = require("express").Router();

productRoute.post("/", saveImgs, addProductHandler);

productRoute.get("/", getAllProductHandler);

productRoute.get("/:id", getOneProductHandler);

productRoute.delete("/:id", dropProductHandler);

productRoute.patch("/:id", saveImgs, updateProductHandler);

productRoute.get("/paginate/:page", productPaginateHandler);

productRoute.get("/paginate/:type/:id/:page", productFilterByHandler);

export default productRoute;

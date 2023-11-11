import {
  addProductHandler,
  dropProductHandler,
  getAllProductHandler,
  getOneProductHandler,
  productFilterByHandler,
  productPaginateHandler,
  updateProductHandler,
} from "../controller/product.controller";
import {
  hasAnyPermit,
  roleValidator,
  validateToken,
} from "../middleware/validator.middleware";
import { commonSchema } from "../schema/schema";
import { saveImg, saveImgs } from "../utils/gallary";
const productRoute = require("express").Router();

productRoute.post(
  "/",
  validateToken,
  roleValidator(["admin"]),
  saveImgs,
  addProductHandler
);

productRoute.get(
  "/",
  validateToken,
  hasAnyPermit(["view"]),
  getAllProductHandler
);

productRoute.get(
  "/:id",
  validateToken,
  hasAnyPermit(["view"]),
  getOneProductHandler
);

productRoute.delete(
  "/:id",
  validateToken,
  roleValidator(["admin", "manger"]),
  dropProductHandler
);

productRoute.patch(
  "/:id",
  validateToken,
  roleValidator(["admin", "manger"]),
  saveImgs,
  updateProductHandler
);

productRoute.get(
  "/page/:page",
  validateToken,
  hasAnyPermit(["view"]),
  productPaginateHandler
);

productRoute.get(
  "/page/:type/:id/:page",
  validateToken,
  hasAnyPermit(["view"]),
  productFilterByHandler
);

export default productRoute;

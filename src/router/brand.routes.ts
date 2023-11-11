import {
  addBrandHandler,
  dropBrandHandler,
  getAllBrandHandler,
  getOneBrandHandler,
  updateBrandHandler,
} from "../controller/brand.controller";
import {
  hasAnyPermit,
  roleValidator,
  validateAll,
  validateToken,
} from "../middleware/validator.middleware";
import { commonSchema } from "../schema/schema";
import { saveImg } from "../utils/gallary";
const brandRoute = require("express").Router();

brandRoute.post(
  "/",
  validateToken,
  validateAll(commonSchema),
  roleValidator(["admin", "manager"]),
  hasAnyPermit(["add"]),
  saveImg,
  addBrandHandler
);

brandRoute.get("/", validateToken, hasAnyPermit(["view"]), getAllBrandHandler);

brandRoute.get(
  "/:id",
  validateToken,
  hasAnyPermit(["view"]),
  getOneBrandHandler
);

brandRoute.delete(
  "/:id",
  validateToken,
  roleValidator(["admin", "manager"]),
  hasAnyPermit(["delete"]),
  dropBrandHandler
);

brandRoute.patch(
  "/:id",
  validateToken,
  roleValidator(["admin", "manager"]),
  hasAnyPermit(["edit"]),
  saveImg,
  updateBrandHandler
);

export default brandRoute;

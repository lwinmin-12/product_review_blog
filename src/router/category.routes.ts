import {
  addCategoryHandler,
  dropCatsHandler,
  getAllCatsHandler,
  getOneCatsHandler,
  updateCatsHandler,
} from "../controller/category.controller";
import {
  hasAnyPermit,
  roleValidator,
  validateAll,
  validateToken,
} from "../middleware/validator.middleware";
import { commonSchema } from "../schema/schema";
import { saveImg } from "../utils/gallary";
const categoryRoute = require("express").Router();

categoryRoute.post(
  "/",
  validateToken,
  validateAll(commonSchema),
  roleValidator(["admin", "manager"]),
  hasAnyPermit(["add"]),
  saveImg,
  addCategoryHandler
);

categoryRoute.get(
  "/",
  validateToken,
  hasAnyPermit(["view"]),
  getAllCatsHandler
);

categoryRoute.get(
  "/:id",
  validateToken,
  hasAnyPermit(["view"]),
  getOneCatsHandler
);

categoryRoute.delete(
  "/:id",
  validateToken,
  roleValidator(["admin", "manager"]),
  hasAnyPermit(["delete"]),
  dropCatsHandler
);

categoryRoute.patch(
  "/:id",
  validateToken,
  roleValidator(["admin", "manager"]),
  hasAnyPermit(["edit"]),
  saveImg,
  updateCatsHandler
);

export default categoryRoute;

import {
  addTagHandler,
  dropTagHandler,
  getAllTagHandler,
  getOneTagHandler,
  updateTagHandler,
} from "../controller/tag.controller";
import {
  hasAnyPermit,
  roleValidator,
  validateAll,
  validateToken,
} from "../middleware/validator.middleware";
import { commonSchema } from "../schema/schema";
import { saveImg } from "../utils/gallary";
const tagRoute = require("express").Router();

tagRoute.post(
  "/",
  validateToken,
  validateAll(commonSchema),
  roleValidator(["admin"]),
  hasAnyPermit(["add"]),
  saveImg,
  addTagHandler
);

tagRoute.get("/", validateToken, hasAnyPermit(["view"]), getAllTagHandler);

tagRoute.get("/:id", validateToken, hasAnyPermit(["view"]), getOneTagHandler);

tagRoute.delete(
  "/:id",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  dropTagHandler
);

tagRoute.patch(
  "/:id",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["edit"]),
  saveImg,
  updateTagHandler
);

export default tagRoute;

import {
  getPermitHandler,
  addPermitHandler,
  deletPermitHandler,
} from "../controller/permit.controller";
import {
  hasAnyPermit,
  roleValidator,
  validateAll,
  validateToken,
} from "../middleware/validator.middleware";
import { allSchemaId, permitSchema } from "../schema/schema";

const permitRoute = require("express").Router();

permitRoute.get(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["view"]),
  getPermitHandler
);
permitRoute.post(
  "/",
  validateToken,
  validateAll(permitSchema),
  roleValidator(["admin"]),
  hasAnyPermit(["add"]),
  addPermitHandler
);
permitRoute.delete(
  "/",
  validateToken,
  validateAll(allSchemaId),
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  deletPermitHandler
);

export default permitRoute;

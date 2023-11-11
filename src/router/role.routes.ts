import {
  getRoleHandler,
  addRoleHandler,
  deletRoleHandler,
} from "../controller/role.controller";
import {
  hasAnyPermit,
  roleValidator,
  validateAll,
  validateToken,
} from "../middleware/validator.middleware";

import { allSchemaId, roleSchema } from "../schema/schema";

const roleRoute = require("express").Router();

roleRoute.get(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["view"]),
  getRoleHandler
);

roleRoute.post(
  "/",
  validateToken,
  validateAll(roleSchema),
  roleValidator(["admin"]),
  hasAnyPermit(["add"]),
  addRoleHandler
);

roleRoute.delete(
  "/",
  validateToken,
  validateAll(allSchemaId),
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  deletRoleHandler
);

export default roleRoute;

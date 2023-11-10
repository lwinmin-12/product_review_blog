import {
  getRoleHandler,
  addRoleHandler,
  deletRoleHandler,
} from "../controller/role.controller";
import { roleValidator, validateAll } from "../middleware/validator.middleware";

import { allSchemaId, roleSchema } from "../schema/schema";

const roleRoute = require("express").Router();

roleRoute.get(
  "/",
//   validateToken,
  roleValidator(["admin"]),
  getRoleHandler
);

roleRoute.post(
  "/",
//   validateToken,
  validateAll(roleSchema),
  roleValidator(["admin"]),
  addRoleHandler
);

roleRoute.delete(
  "/",
//   validateToken,
  validateAll(allSchemaId),
  roleValidator(["admin"]),
  deletRoleHandler
);

export default roleRoute;

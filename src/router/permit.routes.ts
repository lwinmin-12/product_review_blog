import {
  getPermitHandler,
  addPermitHandler,
  deletPermitHandler,
} from "../controller/permit.controller";
import { roleValidator, validateAll } from "../middleware/validator.middleware";
import { allSchemaId, permitSchema } from "../schema/schema";

const permitRoute = require("express").Router();

permitRoute.get(
  "/",
  // validateToken,
  roleValidator(["admin"]),
  getPermitHandler
);
permitRoute.post(
  "/",
  // validateToken,
  validateAll(permitSchema),
  roleValidator(["admin"]),
  addPermitHandler
);
permitRoute.delete(
  "/",
  // validateToken,
  validateAll(allSchemaId),
  roleValidator(["admin"]),
  deletPermitHandler
);

export default permitRoute;

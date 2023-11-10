const userRoute = require("express").Router();

import {
  deleteUserHandler,
  getUserHandler,
  loginUserHandler,
  registerUserHandler,
  updateUserHandler,
  userAddPermitHandler,
  userAddRoleHandler,
  userRemovePermitHandler,
  userRemoveRoleHandler,
} from "../controller/user.controller";
import {
  hasAnyPermit,
  roleValidator,
  validateAll,
  validateToken,
} from "../middleware/validator.middleware";

import {
  createUserSchema,
  loginUserSchema,
  userPermitSchema,
  userRoleSchema,
} from "../schema/schema";

//register user
userRoute.post("/register", validateAll(createUserSchema), registerUserHandler);

//login user
userRoute.post("/login", validateAll(loginUserSchema), loginUserHandler);

//update
userRoute.patch(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["edit"]),
  updateUserHandler
);

//getuser
userRoute.get("/", validateToken, getUserHandler);

//delete each user
userRoute.delete(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  deleteUserHandler
);

//admin routes
//beware deleting all user route
userRoute.delete(
  "/admin",
  validateToken,
  roleValidator(["admin"]),
  deleteUserHandler
);

//adding role in user
userRoute.patch(
  "/add/role",
  validateToken,
  validateAll(userRoleSchema),
  roleValidator(["admin"]),
  hasAnyPermit(["add"]),
  userAddRoleHandler
);

userRoute.patch(
  "/remove/role",
  validateToken,
  validateAll(userRoleSchema),
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  userRemoveRoleHandler
);

//adding permit in user
userRoute.patch(
  "/add/permit",
  validateToken,
  validateAll(userPermitSchema),
  roleValidator(["admin"]),
  hasAnyPermit(["add"]),
  userAddPermitHandler
);

userRoute.patch(
  "/remove/permit",
  validateToken,
  validateAll(userPermitSchema),
  roleValidator(["admin", "installer"]),
  hasAnyPermit(["delete"]),
  userRemovePermitHandler
);

export default userRoute;

import {
  addFeedbackHandler,
  deletFeedbackHandler,
  getFeedbackHandler,
} from "../controller/feedback.controller";
import { hasAnyPermit, roleValidator, validateAll, validateToken } from "../middleware/validator.middleware";
import { allSchemaId, feedbackSchema } from "../schema/schema";

const feedbackRoute = require("express").Router();

feedbackRoute.get(
  "/page/:page",
  validateToken,
  hasAnyPermit(["view"]),
  getFeedbackHandler
);

feedbackRoute.post(
  "/",
  validateToken,
  validateAll(feedbackSchema),
  roleValidator(["user"]),
  hasAnyPermit(["add"]),
  addFeedbackHandler
);

feedbackRoute.delete(
  "/:id",
  validateToken,
  roleValidator(['admin']),
  hasAnyPermit(["delete"]),
  validateAll(allSchemaId),
  deletFeedbackHandler
);

export default feedbackRoute;

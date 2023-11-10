import {
  addFeedbackHandler,
  deletFeedbackHandler,
  getFeedbackHandler,
} from "../controller/feedback.controller";
import { roleValidator, validateAll, validateToken } from "../middleware/validator.middleware";
import { allSchemaId, feedbackSchema } from "../schema/schema";

const feedbackRoute = require("express").Router();

feedbackRoute.get(
  "/page/:page",
  validateToken,
  getFeedbackHandler
);

feedbackRoute.post(
  "/",
  validateToken,
  validateAll(feedbackSchema),
  addFeedbackHandler
);

feedbackRoute.delete(
  "/",
  validateToken,
  roleValidator(['admin']),
  validateAll(allSchemaId),
  deletFeedbackHandler
);

export default feedbackRoute;

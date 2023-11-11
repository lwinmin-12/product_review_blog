import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import {
  addFeedback,
  deleteFeedback,
  getFeedback,
} from "../service/feedback.service";

export const getFeedbackHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let pageNo = Number(req.params.page);

    let result = await getFeedback(req.query, pageNo);
    fMsg(res, "Feedback are here", result);
  } catch (e: any) {
    next(e);
  }
};

export const addFeedbackHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addFeedback(req.body);
    fMsg(res, "New Feedback was added", result);
  } catch (e: any) {
    next(e);
  }
};

export const deletFeedbackHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let id = Number(req.params.id);

    await deleteFeedback(id);
    fMsg(res, "Feedback was deleted");
  } catch (e: any) {
    next(e);
  }
};

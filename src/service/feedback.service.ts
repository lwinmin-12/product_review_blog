import { FilterQuery } from "mongoose";
import feedbackModel, { feedbackDocument } from "../model/feedback.model";
import config from "config";

export const getFeedback = async (
  query: FilterQuery<feedbackDocument>,
  pageNo: number
) => {
  const limitNo = config.get<number>("page_limit");
  const reqPage = pageNo == 1 ? 0 : pageNo - 1;
  const skipCount = limitNo * reqPage;
  return await feedbackModel.find(query).skip(skipCount).limit(limitNo);
};

export const addFeedback = async (body: feedbackDocument) => {
  let result = await feedbackModel.findOne({
    userId: body.userId,
    productId: body.productId,
  });
  if (result) throw new Error("already added feedback");
  return await new feedbackModel(body).save();
};

export const deleteFeedback = async (id: feedbackDocument["_id"]) => {
  return await feedbackModel.findByIdAndDelete(id);
};

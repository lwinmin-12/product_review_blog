import { FilterQuery } from "mongoose";
import feedbackModel, { feedbackDocument } from "../model/feedback.model";
import config from "config";

export const getFeedback = async (query: FilterQuery<feedbackDocument> , pageNo: number) => {
  try {
    const limitNo = config.get<number>("page_limit");
    const reqPage = pageNo == 1 ? 0 : pageNo - 1;
    const skipCount = limitNo * reqPage;
    return await feedbackModel.find(query).skip(skipCount).limit(limitNo);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const addFeedback = async (body: feedbackDocument) => {
  try {
    return await new feedbackModel(body).save();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteFeedback = async (query: FilterQuery<feedbackDocument>) => {
  try {
    return await feedbackModel.deleteMany(query);
  } catch (e: any) {
    throw new Error(e);
  }
};

import { FilterQuery, UpdateQuery } from "mongoose";
import tagModel, { tagDocument } from "../model/tag.model";

export const addTag = async (payload: tagDocument) => {
  let check = await tagModel.findOne({ name: payload.name });
  if (check) {
    throw new Error("Tag name already exist");
  }
  return await new tagModel(payload).save();
};

export const getAllTag = async (query: FilterQuery<tagDocument>) => {
  return await tagModel.find(query);
};

export const getOneTag = async (id: tagDocument["_id"]) => {
  return await tagModel.findById(id);
};

export const dropTag = async (id: tagDocument["_id"]) => {
  return await tagModel.findByIdAndDelete(id);
};
export const updateTag = async (
  id: tagDocument["_id"],
  payload: UpdateQuery<tagDocument>
) => {
  let tag = await tagModel.findById(id);

  if (!tag) {
    throw new Error("No Tag with that id");
  }

  await tagModel.findByIdAndUpdate(id, payload);
  return await tagModel.findById(id);
};

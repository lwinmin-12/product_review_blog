import { FilterQuery, UpdateQuery } from "mongoose";
import categoryModel, { categoryDocument } from "../model/category.model";

export const addCategory = async (payload: categoryDocument) => {
  let check = await categoryModel.findOne({ name: payload.name });
  if (check) {
    throw new Error("Category name already exist");
  }
  return await new categoryModel(payload).save();
};

export const getAllCats = async (query :FilterQuery<categoryDocument>) => {
  return await categoryModel.find(query);
};

export const getOneCats = async (id: categoryDocument["_id"]) => {
  return await categoryModel.findById(id);
};

export const dropCats = async (id: categoryDocument["_id"]) => {
  return await categoryModel.findByIdAndDelete(id);
};
export const updateCats = async (
  id: categoryDocument["_id"],
  payload:  UpdateQuery<categoryDocument>
) => {
  let cats = await categoryModel.findById(id);

  if (!cats) {
    throw new Error("No cats with that id");
  }

  await categoryModel.findByIdAndUpdate(id, payload);
  return await categoryModel.findById(id);
};

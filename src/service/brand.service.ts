import { FilterQuery, UpdateQuery } from "mongoose";
import brandModel, { brandDocument } from "../model/brand.model";

export const addBrand = async (payload: brandDocument) => {
  let check = await brandModel.findOne({ name: payload.name });
  if (check) {
    throw new Error("brand name already exist");
  }
  return await new brandModel(payload).save();
};

export const getAllBrand = async (query: FilterQuery<brandDocument>) => {
  return await brandModel.find(query);
};

export const getOneBrand = async (id: brandDocument["_id"]) => {
  return await brandModel.findById(id);
};

export const dropBrand = async (id: brandDocument["_id"]) => {
  return await brandModel.findByIdAndDelete(id);
};
export const updateBrand = async (
  id: brandDocument["_id"],
  payload: UpdateQuery<brandDocument>
) => {
  let brand = await brandModel.findById(id);

  if (!brand) {
    throw new Error("No Brand with that id");
  }

  await brandModel.findByIdAndUpdate(id, payload);
  return await brandModel.findById(id);
};

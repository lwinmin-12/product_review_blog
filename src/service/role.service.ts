import { FilterQuery } from "mongoose";
import roleModel, { roleDocument } from "../model/role.model";
import { permitDocument } from "../model/permit.model";

export const getRole = async (query: FilterQuery<roleDocument>) => {
  try {
    return await roleModel.find(query).lean().select("-__v");
  } catch (e: any) {
    throw new Error(e);
  }
};

export const addRole = async (body: roleDocument) => {
  try {
    return await new roleModel(body).save();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteRole = async (query: FilterQuery<roleDocument>) => {
  try {
    return await roleModel.deleteMany(query);
  } catch (e: any) {
    throw new Error(e);
  }
};

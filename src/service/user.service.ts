import { FilterQuery, UpdateQuery } from "mongoose";
import userModel, { UserInput, UserDocument } from "../model/user.model";
import { compass, createToken } from "../utils/helper";
import { permitDocument } from "../model/permit.model";

export const registerUser = async (payload: UserInput) => {
  let result = await userModel.create(payload);
  let userObj: Partial<UserDocument> = result.toObject();
  delete userObj.password;
  return userObj;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  let user = await userModel
    .findOne({ email })
    .populate("roles permits")
    .select("-__v");

  if (!user || !compass(password, user.password)) {
    const error: any = new Error("Creditial Error");
    (error as any).status = 401;
    throw error;
  }

  let userObj: any = user.toObject();
  userObj["token"] = createToken(userObj);

  delete userObj.password;
  return userObj;
};

export const getUser = async (query: FilterQuery<UserDocument>) => {
  return await userModel
    .find(query)
    .lean()
    .populate({ path: "roles permits" })
    .select("-password -__v");
};

// export const getCredentialUser = async (query: FilterQuery<UserDocument>) => {
//   try {
//     let result = await userModel
//       .find(query)
//       .lean()
//       .populate({ path: "roles permits" })
//       .select("-__v");
//     return [result[0].email, result[0].password];
//   } catch (e :any) {
//     throw new Error(e);
//   }
// };

export const updateUser = async (
  query: FilterQuery<UserDocument>,
  body: UpdateQuery<UserDocument>
) => {
  await userModel.updateMany(query, body).select("-password -__v");
  return await userModel.find(query).lean();
};

export const deleteUser = async (query: FilterQuery<UserDocument>) => {
  return await userModel.deleteMany(query);
};

export const userAddRole = async (
  userId: UserDocument["_id"],
  roleId: UserDocument["_id"]
) => {
  await userModel.findByIdAndUpdate(userId, {
    $push: { roles: roleId },
  });
  return await userModel.findById(userId).select("-password -__v");
};

export const userRemoveRole = async (
  userId: UserDocument["_id"],
  roleId: UserDocument["_id"]
) => {
  await userModel.findByIdAndUpdate(userId, {
    $pull: { roles: roleId },
  });
  return await userModel.findById(userId).select("-password -__v");
};

export const userAddPermit = async (
  userId: UserDocument["_id"],
  permitId: permitDocument["_id"]
) => {
  await userModel.findByIdAndUpdate(userId, { $push: { permits: permitId } });
  return await userModel.findById(userId).select("-password -__v");
};

export const userRemovePermit = async (
  userId: UserDocument["_id"],
  permitId: permitDocument["_id"]
) => {
  await userModel.findByIdAndUpdate(userId, { $pull: { permits: permitId } });
  return await userModel.findById(userId).select("-password -__v");
};

export const addNewUser = async (payload: UserDocument) => {
  return await new userModel(payload).save();
};

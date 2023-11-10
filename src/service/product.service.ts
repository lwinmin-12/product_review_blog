import config from "config";
import productModel, {
  productDocument,
  productInput,
} from "../model/product.model";

export const addProduct = async (payload: productInput) => {
  let check = await productModel.findOne({ name: payload.name });

  if (check) {
    throw new Error("Product name already exist");
  }
  if (payload.colors) {
    payload.colors = payload.colors.toString().split(",");
  }
  return await new productModel(payload).save();
};

export const getAllProduct = async () => {
  return await productModel.find();
};

export const getOneProduct = async (id: productDocument["_id"]) => {
  return await productModel.findById(id);
};

export const dropProduct = async (id: productDocument["_id"]) => {
  return await productModel.findByIdAndDelete(id);
};

export const updateProduct = async (
  id: productDocument["_id"],
  payload: productDocument
) => {
  let Product = await productModel.findById(id);

  if (!Product) {
    throw new Error("No Product with that id");
  }

  await productModel.findByIdAndUpdate(id, payload);
  return await productModel.findById(id);
};

export const productPaginate = async (pageNo: number) => {
  const limitNo = config.get<number>("page_limit");
  const reqPage = pageNo == 1 ? 0 : pageNo - 1;
  const skipCount = limitNo * reqPage;
  return await productModel.find().skip(skipCount).limit(limitNo);
};

export const productFilterBy = async (
  id: string,
  pageNo: number,
  type: string
) => {
  const limitNo = config.get<number>("page_limit");
  const reqPage = pageNo == 1 ? 0 : pageNo - 1;
  const skipCount = limitNo * reqPage;
  let filterObj: any = {};
  filterObj[`${type}`] = id;
  return await productModel.find(filterObj).skip(skipCount).limit(limitNo);
};

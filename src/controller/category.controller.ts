import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import { addCategory, dropCats, getAllCats, getOneCats, updateCats } from "../service/category.service";

export const addCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addCategory(req.body);
    fMsg(res, "category saved", result);
  } catch (e: any) {
    return next(new Error(e.errors));
  }
};

export const getAllCatsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getAllCats(req.query);
    fMsg(res, "all cats are here", result);
  } catch (e: any) {
    next(new Error(e.errors));
  }
};

export const getOneCatsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getOneCats(req.params.id);
    fMsg(res, "cats by id", result);
  } catch (e: any) {
    next(new Error(e.errors));
  }
};

export const dropCatsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dropCats(req.params.id);
    fMsg(res, "category deleted");
  } catch (e: any) {
    next(new Error(e.errors));
  }
};

export const updateCatsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateCats(req.params.id, req.body);
    fMsg(res, "category updated", result);
  } catch (e: any) {
    next(new Error(e));
  }
};

import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import { addBrand, dropBrand, getAllBrand, getOneBrand, updateBrand } from "../service/brand.service";

export const addBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addBrand(req.body);
    fMsg(res, "Brand saved", result);
  } catch (e: any) {
    return next(new Error(e.errors));
  }
};

export const getAllBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getAllBrand(req.query);
    fMsg(res, "all Brand are here", result);
  } catch (e: any) {
    next(new Error(e.errors));
  }
};

export const getOneBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getOneBrand(req.params.id);
    fMsg(res, "Brand by id", result);
  } catch (e: any) {
    next(new Error(e.errors));
  }
};

export const dropBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dropBrand(req.params.id);
    fMsg(res, "Brand deleted");
  } catch (e: any) {
    next(new Error(e.errors));
  }
};

export const updateBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateBrand(req.params.id, req.body);
    fMsg(res, "Brand updated", result);
  } catch (e: any) {
    next(new Error(e));
  }
};

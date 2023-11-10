import { Request, Response, NextFunction } from "express";
import { getRole, addRole, deleteRole } from "../service/role.service";
import fMsg from "../utils/helper";

export const getRoleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getRole(req.query);
    fMsg(res, "Role are here", result);
  } catch (e: any) {
    next(new Error(e));
  }
};

export const addRoleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addRole(req.body);
    fMsg(res, "New Role was added", result);
  } catch (e: any) {
    next(new Error(e));
  }
};

export const deletRoleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteRole(req.query);
    fMsg(res, "Role was deleted");
  } catch (e: any) {
    next(new Error(e));
  }
};

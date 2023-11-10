import { NextFunction, Response, Request } from "express";
import { checkToken } from "../utils/helper";
import { getUser } from "../service/user.service";
import { permitDocument } from "../model/permit.model";

export const validateAll =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = await schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e: any) {
      console.log(e);
      return next(new Error(e.errors[0].message));
    }
  };
export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new Error("invalid token"));
    }
    let decoded = checkToken(token);
    let user = await getUser({ _id: decoded._id });
    req.body = req.body || {};
    req.body.user = user;
    next();
  } catch (e :any) {
    next(new Error(e));
  }
};

export const roleValidator =
  (role: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let bol: boolean = false;
    //   console.log(req.body);

      for (let i = 0; i < role.length; i++) {
        let foundRole = await req.body.user[0].roles?.find(
          (ea: any) => ea.name == role[i]
        );
        if (foundRole) {
          bol = true;
          break;
        }
      }
      if (!bol) return next(new Error("You dont have enough role"));
      next();
    } catch (e : any) {
      next(new Error(e));
    }
  };


export const hasAnyPermit =
  (permits: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try{
      let bol: boolean = false;
    for (let i = 0; i < permits.length; i++) {
      let hasPermit = req.body.user[0].permits.find(
        (ea: permitDocument) => ea.name == permits[i]
      );
      if (hasPermit) {
        bol = true;
        break;
      }
    }
    if (!bol) return next(new Error("You have not that permit"));
    next();
    }catch(e : any){
    next(new Error(e));
    }
  };


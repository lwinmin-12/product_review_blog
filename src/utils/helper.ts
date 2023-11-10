import { Response } from "express";
import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltWorkFactor = config.get<number>("saltWorkFactor");
const secretKey = config.get<string>("secretKey");
const salt = bcrypt.genSaltSync(saltWorkFactor);

//password checking and converting
export const encode = (payload: string) => bcrypt.hashSync(payload, salt);
export const compass = (payload: string, dbPass: string) =>
  bcrypt.compareSync(payload, dbPass);

//tokenization
export const createToken = (payload: {}) =>
  jwt.sign(payload, secretKey, { expiresIn: "24h" });
export const checkToken = (payload: string): any =>
  jwt.verify(payload, secretKey);


//for response
const fMsg = (
  res: Response,
  msg: string = "all success",
  result: any = [],
  status: number = 200,
  totalCount: number | null = null
) => {
  if (totalCount != null) {
    res.status(status).json({ con: true, msg, result, totalCount });
  } else {
    console.log("wk6");
    res.status(status).json({ con: true, msg, result });
  }
};



export default fMsg;

import fs from "fs";
import config from "config";
import bcrypt from "bcryptjs";
import { encode } from "../utils/helper";

import { roleDocument } from "../model/role.model";
import { addRole, getRole } from "../service/role.service";
import { permitDocument } from "../model/permit.model";
import { addPermit, getPermit } from "../service/permit.service";
import { UserDocument } from "../model/user.model";
import {
  addNewUser,
  getUser,
  userAddPermit,
  userAddRole,
} from "../service/user.service";

export const migrate = async () => {
  let data: any = fs.readFileSync("./src/migrations/user.json");
  let users = JSON.parse(data);
  users.forEach(async (ea: UserDocument) => {
    ea.password = encode(ea.password);
    try {
      let result = await addNewUser(ea);
      console.log(result);
    } catch (e) {
      console.log("already created");
    }
  });
};

export const rp = async () => {
  let data: any = fs.readFileSync("./src/migrations/rolePermit.json");
  let rp = JSON.parse(data);
  rp.roles.forEach(async (ea: roleDocument) => {
    try {
      let result = await addRole(ea);
      console.log(result);
    } catch (e: any) {
      console.log("already created");
    }
  });
  rp.permits.forEach(async (ea: permitDocument) => {
    try {
      let result = await addPermit(ea);
      console.log(result);
    } catch (e: any) {
      console.log("already created");
    }
  });
};

export const adminAddPermit = async () => {
  let admRole = await getRole({ name: "admin" });
  let permit = await getPermit({});
  if (!admRole[0] || !permit) {
    return;
  }

  let user = await getUser({ email: "admin@gmail.com" });

  console.log(user[0].roles.length);

  if (user[0].roles.length == 0) {
    await userAddRole(user[0]._id, admRole[0]._id);
  }

  if (user[0].permits.length == 0) {
    permit.forEach(async (ea) => {
      await userAddPermit(user[0]._id, ea._id);
    });
  }
};

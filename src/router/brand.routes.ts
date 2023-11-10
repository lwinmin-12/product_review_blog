import {
  addBrandHandler,
  dropBrandHandler,
  getAllBrandHandler,
  getOneBrandHandler,
  updateBrandHandler,
} from "../controller/brand.controller";
import { saveImg } from "../utils/gallary";
const brandRoute = require("express").Router();

brandRoute.post("/", saveImg, addBrandHandler);

brandRoute.get("/", getAllBrandHandler);

brandRoute.get("/:id", getOneBrandHandler);

brandRoute.delete("/:id", dropBrandHandler);

brandRoute.patch("/:id", saveImg, updateBrandHandler);

export default brandRoute;

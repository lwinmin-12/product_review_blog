import {
  addCategoryHandler,
  dropCatsHandler,
  getAllCatsHandler,
  getOneCatsHandler,
  updateCatsHandler,
} from "../controller/category.controller";
import { saveImg } from "../utils/gallary";
const categoryRoute = require("express").Router();

categoryRoute.post("/", saveImg, addCategoryHandler);

categoryRoute.get("/", getAllCatsHandler);

categoryRoute.get("/:id", getOneCatsHandler);

categoryRoute.delete("/:id", dropCatsHandler);

categoryRoute.patch("/:id", saveImg, updateCatsHandler);

export default categoryRoute;

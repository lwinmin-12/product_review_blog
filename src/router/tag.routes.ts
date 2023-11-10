import {
  addTagHandler,
  dropTagHandler,
  getAllTagHandler,
  getOneTagHandler,
  updateTagHandler,
} from "../controller/tag.controller";
import { saveImg } from "../utils/gallary";
const tagRoute = require("express").Router();

tagRoute.post("/", saveImg, addTagHandler);

tagRoute.get("/", getAllTagHandler);

tagRoute.get("/:id", getOneTagHandler);

tagRoute.delete("/:id", dropTagHandler);

tagRoute.patch("/:id", saveImg, updateTagHandler);

export default tagRoute;

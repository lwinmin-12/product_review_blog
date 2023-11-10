import mongoose, { Schema } from "mongoose";
import { categoryDocument } from "./category.model";
import { tagDocument } from "./tag.model";
import { brandDocument } from "./brand.model";

export interface productInput {
  name: string;
  price: number;
  discount: number;
  description: string;
  detail: string;
  colors: string[];
  size: string;
  image: [];
}

export interface productDocument extends productInput, mongoose.Document {
  brand: brandDocument["_id"];
  category: categoryDocument["_id"];
  tag: tagDocument["_id"];
}

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "brand" },
  category: { type: Schema.Types.ObjectId, ref: "category" },
  tag: { type: Schema.Types.ObjectId, ref: "tag" },
  discount: { type: Number, default: 0 },
  description: { type: String, required: true },
  detail: { type: String, required: true },
  colors: { type: Array, required: true },
  size: { type: String, required: true },
  images: { type: Array, required: true },
  created: { type: Date, default: Date.now },
});

const productModel = mongoose.model<productDocument>("product", ProductSchema);
export default productModel;

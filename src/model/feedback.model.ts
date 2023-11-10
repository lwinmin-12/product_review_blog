import mongoose, { Schema } from "mongoose";
import { productDocument } from "./product.model";
import { UserDocument } from "./user.model";

export interface feedbackDocument extends mongoose.Document {
  productId: productDocument["_id"];
  userId: UserDocument["_id"];
  rating: string;
  review: string;
  createdAt: Date;
}

let feedbackSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  rating: { type: String, default: "0" },
  review: { type: String , default : ""},
  createdAt: { type: Date, default: Date.now },
});


const feedbackModel = mongoose.model<feedbackDocument>("feedback", feedbackSchema);
export default feedbackModel;
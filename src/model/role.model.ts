import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface roleDocument extends mongoose.Document {
  name: string;
}

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now() },
});

const roleModel = mongoose.model<roleDocument>("role", roleSchema);
export default roleModel;

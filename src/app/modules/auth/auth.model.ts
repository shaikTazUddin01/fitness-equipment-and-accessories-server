import { model, Schema } from "mongoose";

const AuthSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const AuthModel = model("Auth", AuthSchema);

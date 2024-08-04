import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "subAdmin"], required: true },
  status: { type: String, enum: ["active", "block"], required: true },
  isDeleted: { type: Boolean, required: true },
});
//per hook middle ware
AdminSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRounds));
  next();
});
//post hook middle ware
AdminSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const AdminModel = model("Admin", AdminSchema);

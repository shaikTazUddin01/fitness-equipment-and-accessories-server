import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user"], required: true },
 
  isDeleted: { type: Boolean, required: true },
  address: { type: String, required: true },
  image: { type: String, default:"" },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String,enum:["Male","Female","Other"], required: true },
});
//per hook middle ware
UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRounds));
  next();
});
//post hook middle ware
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const UserModel = model("User", UserSchema);

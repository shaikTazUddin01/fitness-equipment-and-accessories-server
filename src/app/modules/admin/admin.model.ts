import { model, Schema } from "mongoose";
import bcrypt  from "bcrypt"
import config from "../../config";

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});
//per hook middle ware
AdminSchema.pre('save',async function(next){
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user=this;
  user.password=await bcrypt.hash(user.password,Number(config.saltRounds))
  next()
})
//post hook middle ware
AdminSchema.set('toJSON',{
  transform:function(doc,ret){
    delete ret.password
    return ret
  }
})

export const AdminModel = model("Admin", AdminSchema);

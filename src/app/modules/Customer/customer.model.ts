import { model, Schema } from "mongoose";


const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  phoneNumber: { type: Number, required: true,unique:true },
 
 
  address: { type: String, required: true },
 
});

export const CustomerModel = model("customer", customerSchema);

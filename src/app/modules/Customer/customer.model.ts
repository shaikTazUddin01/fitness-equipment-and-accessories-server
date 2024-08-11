import { model, Schema } from "mongoose";
import { TCustomer } from "./customer.interface";


const customerSchema = new Schema<TCustomer>({
  // name: { type: String, required: true },
  // email: { type: String, required: true,unique:true },
  // phoneNumber: { type: Number, required: true,unique:true },
 
 
  // address: { type: String, required: true },
  customerId: {
    type: Schema.Types.ObjectId,
    ref:'User',
  },
  // orderId: {
  //   type: Schema.Types.ObjectId,
  //   ref:'order',
  // },
 
});

export const CustomerModel = model("customer", customerSchema);

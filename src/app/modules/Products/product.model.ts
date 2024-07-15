import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchems = new Schema<TProduct>({
  name: { type: String, required: true },
  images: { type: String, required: true },
  price: { type: Number, required: true },
  detail: { type: String, required: true },
  category:{ type: String, required: true },
  stockQuentity:{ type: Number},

}, { timestamps: true });

export const Product = model("product", productSchems);

import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchems = new Schema<TProduct>({
  name: { type: String, required: true },
  images: { type: String, required: true },
  price: { type: Number, required: true },
  productDetail: { type: String, required: true },
  rating: { type: Number, required: true },
});

export const Product = model("product", productSchems);

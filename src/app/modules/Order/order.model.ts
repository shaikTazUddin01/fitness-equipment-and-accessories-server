import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
    },
    customerNumber: {
      type: String,
      required: [true, "Customer number is required"],
    },
    customerAddress: {
      type: String,
      required: [true, "Customer address is required"],
    },
    productName: { type: String, required: [true, "Product name is required"] },
    productCategory: {
      type: String,
      required: [true, "Product category is required"],
    },
    productPrice: {
      type: Number,
      required: [true, "Product price is required"],
    },
    totalItem: {
      type: Number,
      required: [true, "Total item count is required"],
    },
    totalPrice: { type: Number, required: [true, "Total price is required"] },
    paymentStatus: {
      type: String,
      enum: ["payment complete", "cash on delivery"],
      required: [true, "Payment status is required"],
    },
    totalPayment: { type: Number, default: null },
    delivaryFee: { type: Number, default: null },
    status: {
      type: String,
      enum: [
        "delivered",
        "onProcess",
        "cancel",
        "pending",
        "shipped",
        "returned",
      ],
      required: [true, "Order status is required"],
    },
  },
  { timestamps: true }
);

export const OrderModel =model('order',orderSchema)
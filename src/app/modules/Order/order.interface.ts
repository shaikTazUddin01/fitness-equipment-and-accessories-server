import { Types } from "mongoose";

export type TOrder = {
  userId: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  customerNumber: string;
  customerAddress: string;
  productId: Types.ObjectId;
  productPrice: number;
  totalItem: number;
  totalPrice: number;
  delivaryFee?: number | null;
  paymentStatus?: "payment complete" | "cash on delivery";
  totalPayment: number | null;
  status?:
    | "delivered"
    | "onProcess"
    | "cancel"
    | "pending"
    | "shipped"
    | "returned";
};

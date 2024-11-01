import { Types } from "mongoose";

export interface IReview {
  productId: Types.ObjectId;
  review: { userId: Types.ObjectId; review: string; rating: number }[];
}

export type TReview = {
  productId: Types.ObjectId;
  user: Types.ObjectId;
  review: string;
  rating: number;
};

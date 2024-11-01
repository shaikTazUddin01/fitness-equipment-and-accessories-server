import { model, Schema } from "mongoose";
import { IReview } from "./review.interface";


const reviewSchema=new Schema<IReview>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: "product" },
  review: [
    {
      userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      review: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 }
    }
  ]
},{timestamps:true})

export const Review=model('review&rating',reviewSchema)
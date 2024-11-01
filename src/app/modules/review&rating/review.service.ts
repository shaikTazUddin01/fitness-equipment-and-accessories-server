import mongoose from "mongoose";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: TReview) => {
  // console.log(payload);
  const reviewItem = {
    userId: payload?.user,
    rating: payload?.rating,
    review: payload?.review,
  };

  const IsAlreadyExistsProduct = await Review.findOne({
    productId: payload?.productId,
  });

  if (IsAlreadyExistsProduct) {
    IsAlreadyExistsProduct?.review?.push(reviewItem);
    const res = await IsAlreadyExistsProduct.save();

    return res;
  } else {
    const newReview = await Review.create({
      productId: payload.productId,
      review: [reviewItem],
    });

    return newReview;
  }
};

const getAllReview = async (productId: string) => {
  const res = await Review.findOne({ productId })
    .sort({ createdAt: 1 })
    .populate("productId")
    .populate("review.userId");
  // console.log(res);
  return res;
};
const getAllReviewByUser = async (userId: string) => {
  // console.log(userId);

  const res = await Review.aggregate([
    { $unwind: "$review" },
    { $match: { "review.userId": new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "review.userId",
        foreignField: "_id",
        as: "review.userDetails",
      },
    },
  ]);
  return res;
};


const deleteReview = async ({reviewId,userReviewId}:{reviewId:string,userReviewId:string}) => { 
  // console.log(userReviewId,reviewId);
  const res = await Review.updateOne(
    { _id: reviewId },
    { $pull: { review: { _id: userReviewId } } }
  );
// console.log(res);
    return res;
 
};


export const reviewService = {
  createReview,
  getAllReview,
  getAllReviewByUser,
  deleteReview
};

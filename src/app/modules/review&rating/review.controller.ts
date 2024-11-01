import catchAsync from "../../utils/catchAsync";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  // console.log(req.body);
    const result = await reviewService.createReview(req.body);
  
    res.status(200).json({
      success: true,
      message:"create success",
      data: result,
    });
  });


  
const getAllReview= catchAsync(async (req, res) => {
  // console.log(req.body);
  const {productId}=req.params
    const result = await reviewService.getAllReview(productId);
  
    res.status(200).json({
      success: true,
      message:"retrieve success",
      data: result,
    });
  });
const getAllReviewByUser= catchAsync(async (req, res) => {
  // console.log(req.body);
  const {userId}=req.params
    const result = await reviewService.getAllReviewByUser(userId);
  
    res.status(200).json({
      success: true,
      message:"retrieve success",
      data: result,
    });
  });

const deleteReview= catchAsync(async (req, res) => {
  // console.log(req.body);
  // const reviewId=req?.body?.reviewId
  console.log(req.body);
  const {reviewId,userReviewId}=req.body
    const result = await reviewService.deleteReview({reviewId,userReviewId});
  
    res.status(200).json({
      success: true,
      message:"delete success",
      data: result,
    });
  });



  export const reviewController={
    createReview,
    getAllReview,
    getAllReviewByUser,
    deleteReview
  }
import { Router } from "express";
import { reviewController } from "./review.controller";

const router=Router()

router.post("/createReview",reviewController.createReview)
router.get("/:productId",reviewController.getAllReview)
router.get("/user/:userId",reviewController.getAllReviewByUser)
router.delete("/delete",reviewController.deleteReview)


export const reviewRouter=router
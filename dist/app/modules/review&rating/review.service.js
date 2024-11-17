"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const review_model_1 = require("./review.model");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log(payload);
    const reviewItem = {
        userId: payload === null || payload === void 0 ? void 0 : payload.user,
        rating: payload === null || payload === void 0 ? void 0 : payload.rating,
        review: payload === null || payload === void 0 ? void 0 : payload.review,
    };
    const IsAlreadyExistsProduct = yield review_model_1.Review.findOne({
        productId: payload === null || payload === void 0 ? void 0 : payload.productId,
    });
    if (IsAlreadyExistsProduct) {
        (_a = IsAlreadyExistsProduct === null || IsAlreadyExistsProduct === void 0 ? void 0 : IsAlreadyExistsProduct.review) === null || _a === void 0 ? void 0 : _a.push(reviewItem);
        const res = yield IsAlreadyExistsProduct.save();
        return res;
    }
    else {
        const newReview = yield review_model_1.Review.create({
            productId: payload.productId,
            review: [reviewItem],
        });
        return newReview;
    }
});
const getAllReview = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield review_model_1.Review.findOne({ productId })
        .sort({ createdAt: 1 })
        .populate("productId")
        .populate("review.userId");
    // console.log(res);
    return res;
});
const getAllReviewByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(userId);
    const res = yield review_model_1.Review.aggregate([
        { $unwind: "$review" },
        { $match: { "review.userId": new mongoose_1.default.Types.ObjectId(userId) } },
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
});
const deleteReview = (_a) => __awaiter(void 0, [_a], void 0, function* ({ reviewId, userReviewId }) {
    // console.log(userReviewId,reviewId);
    const res = yield review_model_1.Review.updateOne({ _id: reviewId }, { $pull: { review: { _id: userReviewId } } });
    // console.log(res);
    return res;
});
const getReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield review_model_1.Review.find().populate("productId")
        .populate("review.userId");
    return res;
});
exports.reviewService = {
    createReview,
    getAllReview,
    getAllReviewByUser,
    deleteReview,
    getReviews
};

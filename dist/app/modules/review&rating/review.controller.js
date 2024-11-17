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
exports.reviewController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const review_service_1 = require("./review.service");
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const result = yield review_service_1.reviewService.createReview(req.body);
    res.status(200).json({
        success: true,
        message: "create success",
        data: result,
    });
}));
const getAllReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { productId } = req.params;
    const result = yield review_service_1.reviewService.getAllReview(productId);
    res.status(200).json({
        success: true,
        message: "retrieve success",
        data: result,
    });
}));
const getReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const result = yield review_service_1.reviewService.getReviews();
    res.status(200).json({
        success: true,
        message: "retrieve success",
        data: result,
    });
}));
const getAllReviewByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { userId } = req.params;
    const result = yield review_service_1.reviewService.getAllReviewByUser(userId);
    res.status(200).json({
        success: true,
        message: "retrieve success",
        data: result,
    });
}));
const deleteReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    // const reviewId=req?.body?.reviewId
    // console.log(req.body);
    const { reviewId, userReviewId } = req.body;
    const result = yield review_service_1.reviewService.deleteReview({ reviewId, userReviewId });
    res.status(200).json({
        success: true,
        message: "delete success",
        data: result,
    });
}));
exports.reviewController = {
    createReview,
    getAllReview,
    getAllReviewByUser,
    deleteReview,
    getReviews
};

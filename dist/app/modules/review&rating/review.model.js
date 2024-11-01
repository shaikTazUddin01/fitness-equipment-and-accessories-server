"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "product" },
    review: [
        {
            userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
            review: { type: String, required: true },
            rating: { type: Number, required: true, min: 1, max: 5 }
        }
    ]
}, { timestamps: true });
exports.Review = (0, mongoose_1.model)('review&rating', reviewSchema);

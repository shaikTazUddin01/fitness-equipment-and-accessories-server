"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchems = new mongoose_1.Schema({
    name: { type: String, required: true },
    images: { type: String, required: true },
    price: { type: Number, required: true },
    detail: { type: String, required: true },
    category: { type: String, required: true },
    stockQuentity: { type: Number },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("product", productSchems);

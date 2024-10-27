"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    customerName: {
        type: String,
        required: [true, "Customer name is required"],
    },
    customerEmail: {
        type: String,
        required: [true, "Customer email is required"],
    },
    customerNumber: {
        type: String,
        required: [true, "Customer number is required"],
    },
    customerAddress: {
        type: String,
        required: [true, "Customer address is required"],
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'product',
    },
    productPrice: {
        type: Number,
        required: [true, "Product price is required"],
    },
    totalItem: {
        type: Number,
        required: [true, "Total item count is required"],
    },
    totalPrice: { type: Number, required: [true, "Total price is required"] },
    paymentStatus: {
        type: String,
        enum: ["payment complete", "cash on delivery"],
        required: [true, "Payment status is required"],
    },
    totalPayment: { type: Number, default: null },
    delivaryFee: { type: Number, default: null },
    status: {
        type: String,
        enum: [
            "delivered",
            "onProcess",
            "cancel",
            "pending",
            "shipped",
            "returned",
        ],
        default: "onProcess",
        required: [true, "Order status is required"],
    },
    transationId: {
        type: String,
        required: [true, "transationId is required"],
    },
    paymentMethos: {
        type: String,
        required: [true, "Method is required"],
    },
}, { timestamps: true });
exports.OrderModel = (0, mongoose_1.model)('order', orderSchema);

"use strict";
/* eslint-disable no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
// import { VerifyModel } from "../../module/Verify/verify.model";
// import verifyModel from "../../module/Verify/verify.model";
const mongoose_1 = require("mongoose");
const order_model_1 = require("../../modules/Order/order.model");
const product_model_1 = require("../../modules/Products/product.model");
const payment_utils_1 = require("./payment.utils");
const confirmationServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const status = payload === null || payload === void 0 ? void 0 : payload.status;
    //   console.log(payload);
    if (status == "success") {
        const verifyStatus = yield (0, payment_utils_1.verifyPayment)(payload === null || payload === void 0 ? void 0 : payload.tranId);
        // console.log(verifyStatus);
        const paymentInFo = {
            userId: new mongoose_1.Types.ObjectId(payload.userId),
            customerName: verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.cus_name,
            customerEmail: verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.cus_email,
            customerNumber: verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.cus_phone,
            customerAddress: verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.cus_add1,
            productId: new mongoose_1.Types.ObjectId(payload === null || payload === void 0 ? void 0 : payload.productId),
            productPrice: Number(payload === null || payload === void 0 ? void 0 : payload.productPrice),
            totalItem: Number(payload === null || payload === void 0 ? void 0 : payload.quantity),
            totalPrice: verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.amount,
            delivaryFee: 2,
            paymentStatus: "payment complete",
            totalPayment: Number(verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.amount) + 2,
            paymentMethos: verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.payment_processor,
            transationId: verifyStatus === null || verifyStatus === void 0 ? void 0 : verifyStatus.mer_txnid
        };
        // console.log(paymentInFo);
        const isProductOnStock = yield product_model_1.Product.findOne({
            _id: payload === null || payload === void 0 ? void 0 : payload.productId,
        });
        // console.log(isProductOnStock);
        const { stockQuentity } = isProductOnStock;
        // console.log(stockQuentity);
        const res = yield order_model_1.OrderModel.create(paymentInFo);
        console.log(res);
        yield product_model_1.Product.updateOne({
            _id: payload.productId,
        }, {
            stockQuentity: stockQuentity - Number(payload === null || payload === void 0 ? void 0 : payload.quantity),
        });
        return `
      <div style="border: 1px solid #4CAF50; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;margin-top:150px">
        <h1 style="color: #4CAF50;">Payment Success</h1>
        <p style="font-size: 16px; margin: 10px 0;">Thank you for your payment!</p>
        <a href="https://thunder-fitness.vercel.app/products" style="padding: 10px; background-color: #4CAF50; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
    }
    if (status === "fail") {
        return `
      <div style="border: 1px solid #f44336; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;margin-top:150px">
        <h1 style="color: #f44336; ">Payment Failed</h1>
        <p style="font-size: 16px; margin: 10px 0;">Please try again!</p>
        <a href="https://thunder-fitness.vercel.app/products" style="padding: 10px; background-color: #f44336; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
    }
    if (status === "cancel") {
        return `
      <div style="border: 1px solid #ff9800; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;">
        <h1 style="color: #ff9800;margin-top:150px">Payment Canceled</h1>
        <p style="font-size: 16px; margin: 10px 0;">Your payment has been canceled. Please try again.</p>
        <a href="https://thunder-fitness.vercel.app/products" style="padding: 10px; background-color: #ff9800; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
    }
    return null;
});
exports.paymentServices = {
    confirmationServices,
};

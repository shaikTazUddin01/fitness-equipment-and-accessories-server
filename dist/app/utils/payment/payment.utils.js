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
exports.verifyPayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(config_1.default.payment_Url, {
        store_id: config_1.default.store_id,
        signature_key: config_1.default.signature_key,
        tran_id: paymentData.transactionId,
        success_url: `http://localhost:3000/api/payment/confirmation?userId=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.userId}&&tranId=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.transactionId}&&productId=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.productId}&&quantity=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.quantity}&&productPrice=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.productPrice}&&status=success`,
        fail_url: `http://localhost:3000/api/payment/confirmation?userId=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.userId}&&tranId=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.transactionId}&&status=fail`,
        cancel_url: `http://localhost:3000/api/payment/confirmation?userId=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.userId}&&tranId=${paymentData === null || paymentData === void 0 ? void 0 : paymentData.transactionId}&&status=cancel`,
        amount: paymentData.totalAmount,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData === null || paymentData === void 0 ? void 0 : paymentData.custormerName,
        cus_email: paymentData === null || paymentData === void 0 ? void 0 : paymentData.customerEmail,
        cus_add1: paymentData === null || paymentData === void 0 ? void 0 : paymentData.customerAddress,
        cus_country: "Bangladesh",
        cus_phone: paymentData === null || paymentData === void 0 ? void 0 : paymentData.customerPhone,
        user_id: paymentData === null || paymentData === void 0 ? void 0 : paymentData.userId,
        type: "json",
    });
    // console.log(response);
    return response.data;
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(config_1.default.verify_payment_url, {
            params: {
                store_id: config_1.default.store_id,
                signature_key: config_1.default.signature_key,
                type: "json",
                request_id: tnxId
            }
        });
        return response.data;
    }
    catch (err) {
        throw new Error("Payment validation failed!");
    }
});
exports.verifyPayment = verifyPayment;

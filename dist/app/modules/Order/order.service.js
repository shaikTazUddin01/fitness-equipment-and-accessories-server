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
exports.orderService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../../errors/AppErrors");
const product_model_1 = require("../Products/product.model");
const order_model_1 = require("./order.model");
const payment_utils_1 = require("../../utils/payment/payment.utils");
const orderProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.status = "onProcess";
    const { productPrice, totalItem, productId, totalPrice } = data;
    const isProductOnStock = yield product_model_1.Product.findOne({
        _id: productId,
        price: productPrice,
    });
    // console.log(isProductOnStock);
    if (!isProductOnStock) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const { stockQuentity } = isProductOnStock;
    if (stockQuentity === undefined || stockQuentity < totalItem) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "This product is out of stock");
    }
    console.log(data);
    const transactionId = `TXN-${data === null || data === void 0 ? void 0 : data.userId}-${Date.now()}`;
    const paymentData = {
        transactionId,
        totalAmount: totalPrice,
        userId: data === null || data === void 0 ? void 0 : data.userId,
        custormerName: data === null || data === void 0 ? void 0 : data.customerName,
        customerEmail: data === null || data === void 0 ? void 0 : data.customerEmail,
        customerPhone: data === null || data === void 0 ? void 0 : data.customerNumber,
        customerAddress: data === null || data === void 0 ? void 0 : data.customerAddress,
        productId: data === null || data === void 0 ? void 0 : data.productId,
        quantity: data === null || data === void 0 ? void 0 : data.totalItem,
        productPrice: data === null || data === void 0 ? void 0 : data.productPrice
    };
    // console.log(paymentData);
    const paymentLink = yield (0, payment_utils_1.initiatePayment)(paymentData);
    // console.log("-->", paymentLink);
    // const res = await OrderModel.create(data);
    // await Product.updateOne(
    //   {
    //     name: productName,
    //     category: productCategory,
    //     price: productPrice,
    //   },
    //   {
    //     stockQuentity: stockQuentity - totalItem,
    //   }
    // );
    return paymentLink;
});
const findOrderFromDB = (status) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log({status:});
    const res = yield order_model_1.OrderModel.find({ status }).populate("userId").populate('productId');
    return res;
});
const updateOrderStatusInToDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id, status);
    const res = yield order_model_1.OrderModel.findByIdAndUpdate(id, status);
    return res;
});
const findOrderBySpecificUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    const res = yield order_model_1.OrderModel.find({ userId: payload }).populate("userId").populate('productId');
    return res;
});
exports.orderService = {
    orderProduct,
    findOrderFromDB,
    updateOrderStatusInToDB,
    findOrderBySpecificUser
};

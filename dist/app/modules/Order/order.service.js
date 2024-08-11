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
const customer_model_1 = require("../Customer/customer.model");
const orderProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.status = "onProcess";
    const { productName, productCategory, productPrice, totalItem } = data;
    const isProductOnStock = yield product_model_1.Product.findOne({
        name: productName,
        category: productCategory,
        price: productPrice,
    });
    if (!isProductOnStock) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const { stockQuentity } = isProductOnStock;
    if (stockQuentity === undefined || stockQuentity < totalItem) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "This product is out of stock");
    }
    // console.log(data);
    const res = yield order_model_1.OrderModel.create(data);
    const updataStock = yield product_model_1.Product.updateOne({
        name: productName,
        category: productCategory,
        price: productPrice,
    }, {
        stockQuentity: stockQuentity - totalItem,
    });
    // console.log(updataStock);
    // const customerInfo = {
    //   address: res.customerAddress,
    //   email: res.customerEmail,
    //   name: res.customerName,
    //   phoneNumber: res.customerNumber,
    // };
    const customerId = res.userId;
    const isCustomerExists = yield customer_model_1.CustomerModel.findOne({
        email: res.customerEmail,
    });
    console.log(customerId);
    if (!isCustomerExists) {
        const customer = yield customer_model_1.CustomerModel.create({ customerId: customerId });
        console.log(customer);
    }
    return res;
});
const findOrderFromDB = (status) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log({status:});
    const res = yield order_model_1.OrderModel.find({ status }).populate('userId');
    return res;
});
const updateOrderStatusInToDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id, status);
    const res = yield order_model_1.OrderModel.findByIdAndUpdate(id, status);
    return res;
});
exports.orderService = {
    orderProduct,
    findOrderFromDB,
    updateOrderStatusInToDB,
};

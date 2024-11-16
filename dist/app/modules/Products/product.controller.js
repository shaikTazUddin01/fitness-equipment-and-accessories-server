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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.createProductInToDb(req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const getProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    // console.log(query);
    const result = yield product_service_1.productServices.getProductfromDb(query);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log(id);
    const result = yield product_service_1.productServices.getProductById(id);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
//Delete Product
const deleteProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log(id);
    const result = yield product_service_1.productServices.deleteProductfromDb(id);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
//UPdate Product
const updateProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.productServices.updateProductfromDb(id, req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
exports.productController = {
    createProduct,
    getProducts,
    getProductById,
    deleteProductById,
    updateProductById,
};

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createProductInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkProduct = {
        name: payload === null || payload === void 0 ? void 0 : payload.name,
        category: payload === null || payload === void 0 ? void 0 : payload.category,
        price: payload === null || payload === void 0 ? void 0 : payload.price,
    };
    const isExistsProduct = yield product_model_1.Product.findOne(checkProduct);
    if (isExistsProduct) {
        const stockQuentity = isExistsProduct.stockQuentity + 1;
        const result = product_model_1.Product.findByIdAndUpdate(isExistsProduct === null || isExistsProduct === void 0 ? void 0 : isExistsProduct._id, {
            stockQuentity: stockQuentity,
        }, {
            new: true,
        });
        return result;
    }
    else {
        payload.stockQuentity = 1;
        const result = yield product_model_1.Product.create(payload);
        return result;
    }
});
//get product
const getProductfromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let sortedProduct = "-createdAt";
    // eslint-disable-next-line prefer-const
    let selectedCategory = [];
    if (query === null || query === void 0 ? void 0 : query.selectedCategory) {
        selectedCategory = query === null || query === void 0 ? void 0 : query.selectedCategory.split(',').map((category) => category.trim());
    }
    if (query === null || query === void 0 ? void 0 : query.sortProductByPrice) {
        const sortByPrice = query === null || query === void 0 ? void 0 : query.sortProductByPrice;
        if (sortByPrice == "dsc") {
            sortedProduct = "-price";
        }
        if (sortByPrice == "asc") {
            sortedProduct = "price";
        }
    }
    const searchProduct = {};
    if (query && query.searchProduct) {
        searchProduct.name = { $regex: query.searchProduct, $options: "i" };
    }
    //caltegory filter
    if (selectedCategory.length > 0) {
        searchProduct.category = { $in: selectedCategory };
    }
    // console.log(query);
    const result = yield product_model_1.Product.find(searchProduct).sort(sortedProduct);
    return result;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const result = yield product_model_1.Product.findById(id);
    return result;
});
//delete product
const deleteProductfromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
//update product
const updateProductfromDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.productServices = {
    createProductInToDb,
    getProductfromDb,
    getProductById,
    deleteProductfromDb,
    updateProductfromDb,
};

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
    // console.log(payload);
    const checkProduct = {
        name: payload === null || payload === void 0 ? void 0 : payload.name,
        category: payload === null || payload === void 0 ? void 0 : payload.category,
        price: payload === null || payload === void 0 ? void 0 : payload.price,
    };
    const { stockQuentity } = payload;
    const isExistsProduct = yield product_model_1.Product.findOne(checkProduct);
    if (isExistsProduct) {
        const NewStockQuentity = isExistsProduct.stockQuentity + Number(stockQuentity);
        const result = product_model_1.Product.findByIdAndUpdate(isExistsProduct === null || isExistsProduct === void 0 ? void 0 : isExistsProduct._id, {
            stockQuentity: NewStockQuentity,
        }, {
            new: true,
        });
        return result;
    }
    else {
        // payload.stockQuentity = 1;
        const result = yield product_model_1.Product.create(payload);
        return result;
    }
});
//get product
const getProductfromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let sortedProduct = "-createdAt";
    // console.log(query);
    // eslint-disable-next-line prefer-const
    // let selectedCategory: string[] = [];
    // if (query?.selectedCategory) {
    //   selectedCategory = query?.selectedCategory
    //     .split(",")
    //     .map((category: string) => category.trim());
    // }
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
    if (query && query.feature) {
        searchProduct.isFeature = query === null || query === void 0 ? void 0 : query.feature;
    }
    //caltegory filter
    if (query === null || query === void 0 ? void 0 : query.selectedCategory) {
        searchProduct.category = { $in: query === null || query === void 0 ? void 0 : query.selectedCategory };
    }
    //price range filter
    if (query === null || query === void 0 ? void 0 : query.priceRange) {
        const priceFilter = query.priceRange.split(",").map(Number);
        if (priceFilter.length === 2) {
            searchProduct.price = {
                $gt: priceFilter[0],
                $lt: priceFilter[1],
            };
        }
    }
    // console.log(searchProduct);
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

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
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryServices.createCategoryInToDb(req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
});
const getCategorys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryServices.getCategoryfromDb();
    res.status(200).json({
        success: true,
        data: result,
    });
});
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log(id);
    const result = yield category_service_1.CategoryServices.getCategoryById(id);
    res.status(200).json({
        success: true,
        data: result,
    });
});
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log(id);
    const result = yield category_service_1.CategoryServices.deleteCategoryFromDB(id);
    res.status(200).json({
        success: true,
        data: result,
    });
});
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.CategoryServices.updateCategoryInToDb(id, req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
});
exports.CategoryController = {
    createCategory,
    getCategorys,
    getCategoryById,
    deleteCategory,
    updateCategory
};

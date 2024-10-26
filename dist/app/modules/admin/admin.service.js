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
exports.adminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../../errors/AppErrors");
const admin_model_1 = require("./admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createAdminInToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.status = "active";
    data.isDeleted = false;
    const res = yield admin_model_1.AdminModel.create(data);
    return res;
});
const getAdminFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const searchCriteria = { isDeleted: false };
    if (email != "[object Object]") {
        searchCriteria.email = email;
    }
    const res = yield admin_model_1.AdminModel.find(searchCriteria);
    return res;
});
const getSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const res = yield admin_model_1.AdminModel.findById(id);
    return res;
});
const deleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const res = yield admin_model_1.AdminModel.findByIdAndUpdate(id, { isDeleted: true });
    return res;
});
const updateAdminIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id,data);
    // const user=
    const res = yield admin_model_1.AdminModel.findByIdAndUpdate(id, data);
    return res;
});
const updatePassword = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield admin_model_1.AdminModel.findOne({ email });
    if (!isUserExists) {
        throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorized");
    }
    const hashPassword = isUserExists.password;
    const isOldPasswordmatched = yield bcrypt_1.default.compare(data.oldPassword, hashPassword);
    if (!isOldPasswordmatched) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "your old password is incorrect");
    }
    const newPassword = yield bcrypt_1.default.hash(data === null || data === void 0 ? void 0 : data.newPassword, Number(config_1.default.saltRounds));
    const res = yield admin_model_1.AdminModel.findOneAndUpdate({ email }, { password: newPassword });
    return res;
});
exports.adminService = {
    getAdminFromDB,
    getSingleAdminFromDB,
    createAdminInToDB,
    updateAdminIntoDB,
    deleteAdminFromDB,
    updatePassword,
};

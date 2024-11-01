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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../../errors/AppErrors");
const user_model_1 = require("./user.model");
const createUserInToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    const isUserExists = yield user_model_1.UserModel.findOne({ email, phoneNumber });
    if (isUserExists) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "this email is alreary used,please use another email");
    }
    data.isDeleted = false;
    data.role = "user";
    const res = yield user_model_1.UserModel.create(data);
    return res;
});
const getUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.UserModel.find();
    return res;
});
const getSingleUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.UserModel.findOne({ email });
    return res;
});
const deleteSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.UserModel.findByIdAndDelete(id);
    return res;
});
const updateUserFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id,payload);
    const data = payload === null || payload === void 0 ? void 0 : payload.userData;
    // console.log(data);
    const res = yield user_model_1.UserModel.updateOne({ _id: id }, data, { new: true });
    // console.log(res);
    return res;
});
exports.UserService = {
    getUserFromDB,
    getSingleUserFromDB,
    createUserInToDB,
    deleteSingleUserFromDB,
    updateUserFromDB,
};

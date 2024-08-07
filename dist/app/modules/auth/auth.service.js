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
exports.authServices = void 0;
// import jwt from "jsonwebtoken";
const admin_model_1 = require("../admin/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const auth_utilis_1 = require("./auth.utilis");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppErrors_1 = require("../../errors/AppErrors");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
// import { AuthModel } from "./auth.model";
//admin login
const AdminLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield admin_model_1.AdminModel.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    if (!isUserExists) {
        throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorized");
    }
    const plainPassword = data.password;
    const hashedPassword = isUserExists.password;
    const isPasswordmatched = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    if (!isPasswordmatched) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "something is wrong please try with right information");
    }
    const jwtPayload = {
        user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    // access token
    const access_Token = (0, auth_utilis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expressIn);
    //  refresh token
    const refresh_Token = (0, auth_utilis_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expressIn);
    return {
        accessToken: access_Token,
        refreshToken: refresh_Token,
    };
});
//user Login
const UserLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    console.log(isUserExists);
    if (!isUserExists) {
        throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorized");
    }
    const plainPassword = data.password;
    const hashedPassword = isUserExists.password;
    const isPasswordmatched = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    if (!isPasswordmatched) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "something is wrong please try with right information");
    }
    const jwtPayload = {
        user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    // access token
    const access_Token = (0, auth_utilis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expressIn);
    //  refresh token
    const refresh_Token = (0, auth_utilis_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expressIn);
    return {
        accessToken: access_Token,
        refreshToken: refresh_Token,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "yor are not authorization");
    }
    //verify token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const user = decoded === null || decoded === void 0 ? void 0 : decoded.user;
    // const role = (decoded as JwtPayload)?.role;
    //check user exists or not
    const isUserExists = yield admin_model_1.AdminModel.findOne({ email: user });
    if (!isUserExists) {
        throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorization");
    }
    //check status and isDeleted is ok or not
    if (isUserExists.status !== "active" || isUserExists.isDeleted == true) {
        throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorization");
    }
    const jwtPayload = {
        user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const accessToken = (0, auth_utilis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expressIn);
    return {
        accessToken
    };
});
exports.authServices = {
    AdminLogin,
    UserLogin,
    refreshToken,
};

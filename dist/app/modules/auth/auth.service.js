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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = require("../admin/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// import { AuthModel } from "./auth.model";
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield admin_model_1.AdminModel.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    if (!isUserExists) {
        throw new Error("you are not authorized");
    }
    const plainPassword = data.password;
    const hashedPassword = isUserExists.password;
    const isPasswordmatched = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    if (!isPasswordmatched) {
        throw new Error("something is wrong please try with right information");
    }
    const jwtPayload = {
        user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const access_Token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expressIn,
    });
    // const refresh_Token = jwt.sign(
    //   jwtPayload,
    //   config.jwt_refresh_secret as string,
    //   {
    //     expiresIn: config.jwt_refresh_expressIn,
    //   }
    // );
    return {
        accessToken: access_Token,
        // refreshToken: refresh_Token,
    };
});
exports.authServices = {
    login,
};

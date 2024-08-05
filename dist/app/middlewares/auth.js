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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const admin_model_1 = require("../modules/admin/admin.model");
const AppErrors_1 = require("../errors/AppErrors");
const http_status_1 = __importDefault(require("http-status"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "yor are not authorization");
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        }
        catch (error) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorization");
        }
        if (!decoded) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorization");
        }
        const role = decoded === null || decoded === void 0 ? void 0 : decoded.role;
        const user = decoded === null || decoded === void 0 ? void 0 : decoded.user;
        //check user exists or not
        const isUserExists = yield admin_model_1.AdminModel.findOne({ email: user });
        if (!isUserExists) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorization");
        }
        //check status and isDeleted is ok or not
        if (isUserExists.status !== "active" || isUserExists.isDeleted == true) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorization");
        }
        // console.log(role,requiredRoles);
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "you are not authorization");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;

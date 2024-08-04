"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expressIn: process.env.JWT_ACCESS_EXPIRESIN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expressIn: process.env.JWT_REFRESH_EXPIRESIN,
    saltRounds: process.env.SALTROUND
};

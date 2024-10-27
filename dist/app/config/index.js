"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expressIn: process.env.JWT_ACCESS_EXPIRESIN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expressIn: process.env.JWT_REFRESH_EXPIRESIN,
    saltRounds: process.env.SALTROUND,
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api: process.env.CLOUDINARY_API_KEY,
    cloudinary_secret: process.env.CLOUDINARY_API_SECRET,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNETURE_KEY,
    payment_Url: process.env.PAYMENT_URL,
    verify_payment_url: process.env.VERIFY_PAYMENT_URL
};

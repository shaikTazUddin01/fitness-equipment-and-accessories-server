"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notfound = void 0;
const http_status_1 = __importDefault(require("http-status"));
// eslint-disable-next-line no-unused-vars
const notfound = (req, res, next) => {
    return res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "API Not Found",
        error: "",
    });
};
exports.notfound = notfound;

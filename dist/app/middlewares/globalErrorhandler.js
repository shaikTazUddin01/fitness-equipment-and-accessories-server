"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "something went wrong.!";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    });
};
exports.default = globalErrorHandler;

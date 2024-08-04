"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const mongoose_1 = require("mongoose");
const AuthSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});
exports.AuthModel = (0, mongoose_1.model)("Auth", AuthSchema);

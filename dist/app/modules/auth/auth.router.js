"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/admin-login', auth_controller_1.authController.AdminLogin);
router.post('/user-login', auth_controller_1.authController.UserLogin);
router.post('/refresh-token', auth_controller_1.authController.refreshToken);
exports.authRoute = router;

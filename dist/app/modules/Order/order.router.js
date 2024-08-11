"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_constant_1 = require("../admin/admin.constant");
const router = express_1.default.Router();
router.post("/", order_controller_1.orderController.createOrder);
router.get("/", (0, auth_1.default)(admin_constant_1.ADMIN_ROLE.Admin, admin_constant_1.ADMIN_ROLE.SubAdmin), order_controller_1.orderController.findOrder);
router.put("/:id", (0, auth_1.default)(admin_constant_1.ADMIN_ROLE.Admin, admin_constant_1.ADMIN_ROLE.SubAdmin), order_controller_1.orderController.updateOrderStatus);
exports.orderRoute = router;

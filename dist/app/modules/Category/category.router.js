"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_constant_1 = require("../admin/admin.constant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(admin_constant_1.ADMIN_ROLE.admin, admin_constant_1.ADMIN_ROLE.subAdmin), category_controller_1.CategoryController.createCategory);
router.get("/", (0, auth_1.default)(admin_constant_1.ADMIN_ROLE.admin, admin_constant_1.ADMIN_ROLE.subAdmin), category_controller_1.CategoryController.getCategorys);
router.get("/:id", (0, auth_1.default)(admin_constant_1.ADMIN_ROLE.admin, admin_constant_1.ADMIN_ROLE.subAdmin), category_controller_1.CategoryController.getCategoryById);
router.delete("/:id", (0, auth_1.default)(admin_constant_1.ADMIN_ROLE.admin, admin_constant_1.ADMIN_ROLE.subAdmin), category_controller_1.CategoryController.deleteCategory);
router.put("/:id", (0, auth_1.default)(admin_constant_1.ADMIN_ROLE.admin, admin_constant_1.ADMIN_ROLE.subAdmin), category_controller_1.CategoryController.updateCategory);
exports.categoryRoute = router;
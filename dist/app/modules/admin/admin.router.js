"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_constant_1 = require("./admin.constant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(admin_constant_1.ROLE.Admin), admin_controller_1.adminController.createAdmin);
router.get("/", (0, auth_1.default)(admin_constant_1.ROLE.Admin, admin_constant_1.ROLE.SubAdmin), admin_controller_1.adminController.getAdmin);
// router.get('/:id',auth(ROLE.Admin),adminController.getSingleAdmin)
router.delete("/:id", (0, auth_1.default)(admin_constant_1.ROLE.Admin), admin_controller_1.adminController.deleteAdmin);
router.put("/updatePassword", (0, auth_1.default)(admin_constant_1.ROLE.Admin, admin_constant_1.ROLE.SubAdmin), admin_controller_1.adminController.updatePassword);
router.put("/:id", (0, auth_1.default)(admin_constant_1.ROLE.Admin, admin_constant_1.ROLE.SubAdmin), admin_controller_1.adminController.updateAdmin);
exports.adminRoute = router;

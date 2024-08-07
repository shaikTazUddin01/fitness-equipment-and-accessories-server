"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/create-user", user_controller_1.UserController.createUser);
router.get("/", user_controller_1.UserController.getUser);
router.get("/user-info", user_controller_1.UserController.getSingleUser);
router.delete("/:id", user_controller_1.UserController.deleteSingleUser);
exports.userRoute = router;

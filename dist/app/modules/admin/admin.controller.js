"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_service_1 = require("./admin.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// import { AppError } from "../../errors/AppErrors";
// import httpStatus from "http-status";
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.createAdminInToDB(req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const getAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    // console.log(email);
    const result = yield admin_service_1.adminService.getAdminFromDB(email);
    // console.log(result);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const getSingleAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.getSingleAdminFromDB(id);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const deleteAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.deleteAdminFromDB(id);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const updateAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // if(req.user.user !==req.body.email){
    //   throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization")
    // }
    const result = yield admin_service_1.adminService.updateAdminIntoDB(id, req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const updatePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("object");
    console.log(req.query, req.body);
    // if(req.user.user !==req.query){
    //   throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization")
    // }
    const result = yield admin_service_1.adminService.updateAdminIntoDB(req.query, req.body);
    res.status(200).json({
        success: true,
        data: 'result',
    });
}));
exports.adminController = {
    getAdmin,
    getSingleAdmin,
    createAdmin,
    deleteAdmin,
    updateAdmin,
    updatePassword,
};

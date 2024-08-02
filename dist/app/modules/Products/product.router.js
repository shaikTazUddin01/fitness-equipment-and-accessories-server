"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', product_controller_1.productController.createProduct);
router.get('/', product_controller_1.productController.getProducts);
router.get('/:id', product_controller_1.productController.getProductById);
router.delete('/:id', product_controller_1.productController.deleteProductById);
router.patch('/:id', product_controller_1.productController.updateProductById);
exports.productRoute = router;

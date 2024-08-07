import express from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/auth";
import { ADMIN_ROLE } from "../admin/admin.constant";
// import auth from "../../middlewares/auth";
// import { ADMIN_ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id",auth(ADMIN_ROLE.Admin,ADMIN_ROLE.SubAdmin) , productController.deleteProductById);
router.patch("/:id",auth(ADMIN_ROLE.Admin,ADMIN_ROLE.SubAdmin) , productController.updateProductById);

export const productRoute = router;

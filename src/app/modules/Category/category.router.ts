import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "../admin/admin.constant";

// import auth from "../../middlewares/auth";
// import { ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post(
  "/",

  CategoryController.createCategory
);
router.get("/", CategoryController.getCategorys);
router.get("/:id", CategoryController.getCategoryById);

router.delete("/:id",auth(ROLE.Admin,ROLE.SubAdmin) ,CategoryController.deleteCategory);

router.put("/:id",auth(ROLE.Admin,ROLE.SubAdmin) , CategoryController.updateCategory);

export const categoryRoute = router;

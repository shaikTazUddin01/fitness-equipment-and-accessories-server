import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { ADMIN_ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post(
  "/",
  auth(ADMIN_ROLE.admin, ADMIN_ROLE.subAdmin),
  CategoryController.createCategory
);
router.get("/", CategoryController.getCategorys);
router.get("/:id", CategoryController.getCategoryById);
router.delete(
  "/:id",
  auth(ADMIN_ROLE.admin, ADMIN_ROLE.subAdmin),
  CategoryController.deleteCategory
);
router.put(
  "/:id",
  auth(ADMIN_ROLE.admin, ADMIN_ROLE.subAdmin),
  CategoryController.updateCategory
);

export const categoryRoute = router;

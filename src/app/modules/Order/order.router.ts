import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ADMIN_ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get(
  "/",
  auth(ADMIN_ROLE.Admin, ADMIN_ROLE.SubAdmin),
  orderController.findOrder
);
router.put(
  "/:id",
  auth(ADMIN_ROLE.Admin, ADMIN_ROLE.SubAdmin),
  orderController.updateOrderStatus
);

export const orderRoute = router;

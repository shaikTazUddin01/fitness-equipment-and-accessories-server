import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "../admin/admin.constant";
// import { ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get(
  "/",
  auth(ROLE.Admin, ROLE.SubAdmin),
  orderController.findOrder
);
router.put(
  "/:id",
  auth(ROLE.Admin, ROLE.SubAdmin),
  orderController.updateOrderStatus
);
router.get(
  "/OrderHistory",
  orderController.findOrderBySpecificUser
);

export const orderRoute = router;

import { Router } from "express";
import { productRoute } from "../modules/Products/product.router";
import { categoryRoute } from "../modules/Category/category.router";
import { adminRoute } from "../modules/admin/admin.router";
import { authRoute } from "../modules/auth/auth.router";
import { userRoute } from "../modules/user/user.router";
import { orderRoute } from "../modules/Order/order.router";
import { customerRoute } from "../modules/Customer/customer.router";
import { paymentRouter } from "../utils/payment/payment.router";
import { reviewRouter } from "../modules/review&rating/review.router";



const router = Router();

const modulesRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/customer",
    route: customerRoute,
  },
  {
    path: "/payment",
    route: paymentRouter,
  },
  {
    path: "/review",
    route: reviewRouter,
  },
];

modulesRoutes?.forEach((route) => router.use(route.path, route.route));

export default router;

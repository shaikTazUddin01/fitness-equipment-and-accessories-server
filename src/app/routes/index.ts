import { Router } from "express";
import { productRoute } from "../modules/Products/product.router";

const router = Router();

const modulesRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
];

modulesRoutes?.forEach((route) => router.use(route.path, route.route));

export default router;

import { Router } from "express";
import { productRoute } from "../modules/Products/product.router";
import { categoryRoute } from "../modules/Category/category.router";

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
];

modulesRoutes?.forEach((route) => router.use(route.path, route.route));

export default router;

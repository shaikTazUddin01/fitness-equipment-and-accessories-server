import { Router } from "express";
import { productRoute } from "../modules/Products/product.router";
import { categoryRoute } from "../modules/Category/category.router";
import { adminRoute } from "../modules/admin/admin.router";



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
];

modulesRoutes?.forEach((route) => router.use(route.path, route.route));

export default router;

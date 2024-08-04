"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_router_1 = require("../modules/Products/product.router");
const category_router_1 = require("../modules/Category/category.router");
const admin_router_1 = require("../modules/admin/admin.router");
const auth_router_1 = require("../modules/auth/auth.router");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: "/product",
        route: product_router_1.productRoute,
    },
    {
        path: "/category",
        route: category_router_1.categoryRoute,
    },
    {
        path: "/admin",
        route: admin_router_1.adminRoute,
    },
    {
        path: "/auth",
        route: auth_router_1.authRoute,
    },
];
modulesRoutes === null || modulesRoutes === void 0 ? void 0 : modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

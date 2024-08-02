"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_router_1 = require("../modules/Products/product.router");
const category_router_1 = require("../modules/Category/category.router");
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
];
modulesRoutes === null || modulesRoutes === void 0 ? void 0 : modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

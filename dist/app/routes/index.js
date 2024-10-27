"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_router_1 = require("../modules/Products/product.router");
const category_router_1 = require("../modules/Category/category.router");
const admin_router_1 = require("../modules/admin/admin.router");
const auth_router_1 = require("../modules/auth/auth.router");
const user_router_1 = require("../modules/user/user.router");
const order_router_1 = require("../modules/Order/order.router");
const customer_router_1 = require("../modules/Customer/customer.router");
const payment_router_1 = require("../utils/payment/payment.router");
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
        path: "/user",
        route: user_router_1.userRoute,
    },
    {
        path: "/auth",
        route: auth_router_1.authRoute,
    },
    {
        path: "/order",
        route: order_router_1.orderRoute,
    },
    {
        path: "/customer",
        route: customer_router_1.customerRoute,
    },
    {
        path: "/payment",
        route: payment_router_1.paymentRouter,
    },
];
modulesRoutes === null || modulesRoutes === void 0 ? void 0 : modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

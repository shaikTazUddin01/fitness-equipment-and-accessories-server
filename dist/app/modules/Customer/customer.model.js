"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    // name: { type: String, required: true },
    // email: { type: String, required: true,unique:true },
    // phoneNumber: { type: Number, required: true,unique:true },
    // address: { type: String, required: true },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    // orderId: {
    //   type: Schema.Types.ObjectId,
    //   ref:'order',
    // },
});
exports.CustomerModel = (0, mongoose_1.model)("customer", customerSchema);

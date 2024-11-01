/* eslint-disable no-unused-vars */

// import { VerifyModel } from "../../module/Verify/verify.model";
// import verifyModel from "../../module/Verify/verify.model";
import { Types } from "mongoose";
import { TOrder } from "../../modules/Order/order.interface";
import { OrderModel } from "../../modules/Order/order.model";
import { Product } from "../../modules/Products/product.model";
import { verifyPayment } from "./payment.utils";

const confirmationServices = async (payload: Record<string, string>) => {
  const status = payload?.status;
  //   console.log(payload);
  if (status == "success") {
    const verifyStatus = await verifyPayment(payload?.tranId);

    // console.log(verifyStatus);

    const paymentInFo: TOrder = {
      userId:new Types.ObjectId(payload.userId) ,
      customerName: verifyStatus?.cus_name,
      customerEmail: verifyStatus?.cus_email,
      customerNumber: verifyStatus?.cus_phone,
      customerAddress: verifyStatus?.cus_add1,
      productId:new Types.ObjectId (payload?.productId),
      productPrice: Number(payload?.productPrice),
      totalItem: Number(payload?.quantity),
      totalPrice: verifyStatus?.amount,
      delivaryFee: 2,
      paymentStatus: "payment complete",
      totalPayment: Number(verifyStatus?.amount) + 2,
      paymentMethos:verifyStatus?.payment_processor,
      transationId:verifyStatus?.mer_txnid
      

    };
    // console.log(paymentInFo);
    const isProductOnStock = await Product.findOne({
      _id: payload?.productId,
    });
    // console.log(isProductOnStock);

    const { stockQuentity  }:any = isProductOnStock;

// console.log(stockQuentity);

    const res= await OrderModel.create(paymentInFo);
    console.log(res);

    await Product.updateOne(
      {
        _id: payload.productId,
      },
      {
        stockQuentity: stockQuentity - Number(payload?.quantity),
      }
    );

    return `
      <div style="border: 1px solid #4CAF50; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;margin-top:150px">
        <h1 style="color: #4CAF50;">Payment Success</h1>
        <p style="font-size: 16px; margin: 10px 0;">Thank you for your payment!</p>
        <a href="https://thunder-fitness.vercel.app/products" style="padding: 10px; background-color: #4CAF50; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
  }

  if (status === "fail") {
    return `
      <div style="border: 1px solid #f44336; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;margin-top:150px">
        <h1 style="color: #f44336; ">Payment Failed</h1>
        <p style="font-size: 16px; margin: 10px 0;">Please try again!</p>
        <a href="https://thunder-fitness.vercel.app/products" style="padding: 10px; background-color: #f44336; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
  }

  if (status === "cancel") {
    return `
      <div style="border: 1px solid #ff9800; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;">
        <h1 style="color: #ff9800;margin-top:150px">Payment Canceled</h1>
        <p style="font-size: 16px; margin: 10px 0;">Your payment has been canceled. Please try again.</p>
        <a href="https://thunder-fitness.vercel.app/products" style="padding: 10px; background-color: #ff9800; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
  }

  return null;
};





export const paymentServices = {
  confirmationServices,
};

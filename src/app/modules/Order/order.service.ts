/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { Product } from "../Products/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";
import { CustomerModel } from "../Customer/customer.model";
import { initiatePayment } from "../../utils/payment/payment.utils";

const orderProduct = async (data: TOrder) => {
  data.status = "onProcess";
  const { productPrice, totalItem,productId,totalPrice } = data;
  const isProductOnStock = await Product.findOne({
    _id: productId,
    price: productPrice,
  });
  // console.log(isProductOnStock);
  if (!isProductOnStock) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const { stockQuentity } = isProductOnStock;

  if (stockQuentity === undefined || stockQuentity < totalItem) {
    throw new AppError(httpStatus.BAD_REQUEST, "This product is out of stock");
  }

  console.log(data);

  const transactionId = `TXN-${data?.userId}-${Date.now()}`;

  const paymentData = {
    transactionId,
    totalAmount: totalPrice,
    userId: data?.userId,
    custormerName: data?.customerName,
    customerEmail: data?.customerEmail,
    customerPhone: data?.customerNumber,
    customerAddress: data?.customerAddress,
    productId: data?.productId,
    quantity: data?.totalItem,
    productPrice:data?.productPrice
  };
  // console.log(paymentData);

  const paymentLink = await initiatePayment(paymentData);
  // console.log("-->", paymentLink);

  // const res = await OrderModel.create(data);

  // await Product.updateOne(
  //   {
  //     name: productName,
  //     category: productCategory,
  //     price: productPrice,
  //   },
  //   {
  //     stockQuentity: stockQuentity - totalItem,
  //   }
  // );

  return paymentLink;
};

const findOrderFromDB = async (status: string) => {
  // console.log({status:});
  const res = await OrderModel.find({ status }).populate("userId");

  return res;
};

const updateOrderStatusInToDB = async (
  id: string,
  status: Record<string, string>
) => {
  // console.log(id, status);
  const res = await OrderModel.findByIdAndUpdate(id, status);

  return res;
};
export const orderService = {
  orderProduct,
  findOrderFromDB,
  updateOrderStatusInToDB,
};

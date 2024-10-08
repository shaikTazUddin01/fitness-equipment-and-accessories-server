/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { Product } from "../Products/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";
import { CustomerModel } from "../Customer/customer.model";

const orderProduct = async (data: TOrder) => {
  data.status = "onProcess";
  const { productName, productCategory, productPrice, totalItem } = data;
  const isProductOnStock = await Product.findOne({
    name: productName,
    category: productCategory,
    price: productPrice,
  });

  if (!isProductOnStock) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const { stockQuentity } = isProductOnStock;

  if (stockQuentity === undefined || stockQuentity < totalItem) {
    throw new AppError(httpStatus.BAD_REQUEST, "This product is out of stock");
  }

  // console.log(data);
  const res = await OrderModel.create(data);

  const updataStock = await Product.updateOne(
    {
      name: productName,
      category: productCategory,
      price: productPrice,
    },
    {
      stockQuentity: stockQuentity - totalItem,
    }
  );

  // console.log(updataStock);

  // const customerInfo = {
  //   address: res.customerAddress,
  //   email: res.customerEmail,
  //   name: res.customerName,
  //   phoneNumber: res.customerNumber,
  // };

  const customerId=res.userId
  const isCustomerExists = await CustomerModel.findOne({
    email: res.customerEmail,
  });

  console.log(customerId);
  if (!isCustomerExists) {
    const customer = await CustomerModel.create({customerId:customerId});
    console.log(customer);
  }

  return res;
};

const findOrderFromDB = async (status: string) => {
  // console.log({status:});
  const res = await OrderModel.find({ status }).populate('userId');

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

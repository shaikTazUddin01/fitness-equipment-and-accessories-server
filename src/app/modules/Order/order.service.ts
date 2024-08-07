import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { Product } from "../Products/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const orderProduct = async (data: TOrder) => {
  data.status="onProcess";
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
    return res;
};

export const orderService = {
  orderProduct,
};

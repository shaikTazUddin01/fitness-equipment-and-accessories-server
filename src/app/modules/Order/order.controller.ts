import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  // console.log("-->>",req.body);
  const result = await orderService.orderProduct(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const findOrder = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.query;
  // console.log(status);
  const result = await orderService.findOrderFromDB(status as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const {id}=req.params
  const result = await orderService.updateOrderStatusInToDB(id,req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});


const findOrderBySpecificUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.query;
  // console.log(userId);
  const result = await orderService.findOrderBySpecificUser(userId as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const orderController = {
  createOrder,
  findOrder,
  updateOrderStatus,
  findOrderBySpecificUser
};

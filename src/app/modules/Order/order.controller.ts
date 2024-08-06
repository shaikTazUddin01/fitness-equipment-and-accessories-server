import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await orderService.orderProduct(req.body);
  
    res.status(200).json({
      success: true,
      data: result,
    });
  });

  export const orderController={
    createOrder
  }
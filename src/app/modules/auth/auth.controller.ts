import { Request, Response } from "express";
import { authServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const authController = {
  login,
};

import { Request, Response } from "express";
import { authServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

const AdminLogin = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await authServices.AdminLogin(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: { accessToken },
  });
});
const UserLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.UserLogin(req.body);
  // console.log(result);
  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: { accessToken },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);
  const { accessToken } = result;

  res.status(200).json({
    success: true,
    data: { accessToken },
  });
});

export const authController = {
  AdminLogin,
  refreshToken,
  UserLogin
};

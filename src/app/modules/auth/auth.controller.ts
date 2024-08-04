import { Request, Response } from "express";
import { authServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);
  const{refreshToken,accessToken}=result
  res.cookie('refreshToken',refreshToken,{
    secure:config.node_env === 'production',
    httpOnly:true
  })

  res.status(200).json({
    success: true,
    data: {accessToken},
  });
});
// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const result = await authServices.refreshToken(req.body);

//   res.status(200).json({
//     success: true,
//     data: result,
//   });
// });

export const authController = {
  login,
  // refreshToken
};

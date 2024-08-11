import { Request, Response } from "express";
import { adminService } from "./admin.service";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../../errors/AppErrors";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.createAdminInToDB(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  
  const result = await adminService.getAdminFromDB(email as string);
  // console.log(req.query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.getSingleAdminFromDB(id);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.deleteAdminFromDB(id);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;


  if(req.user.user !==req.body.email){
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization")
  }
  const result = await adminService.updateAdminIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const adminController = {
  getAdmin,
  getSingleAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
};

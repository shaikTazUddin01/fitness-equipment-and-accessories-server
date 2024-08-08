import { Request, Response } from "express";
import { adminService } from "./admin.service";
import catchAsync from "../../utils/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.createAdminInToDB(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAdminFromDB();

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
  // console.log(req.params,req.body);
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

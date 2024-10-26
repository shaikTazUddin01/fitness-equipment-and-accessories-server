import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";

const createUser =catchAsync( async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await UserService.createUserInToDB(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
})
const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserFromDB();

  res.status(200).json({
    success: true,
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  console.log(req.query);
  const result = await UserService.getSingleUserFromDB(email as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteSingleUserFromDB(id);

  res.status(200).json({
    success: true,
    data: result,
  });
});




export const UserController = {
  getUser,
  getSingleUser,
  createUser,
  deleteSingleUser
};

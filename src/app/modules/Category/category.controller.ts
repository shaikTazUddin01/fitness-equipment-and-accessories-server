import { Request, Response } from "express";
import { CategoryServices } from "./category.service";
import catchAsync from "../../utils/catchAsync";


const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategoryInToDb(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const getCategorys =catchAsync( async (req: Request, res: Response) => {
// console.log("user",req.user);
// console.log(req.cookies);

  const result = await CategoryServices.getCategoryfromDb();

  res.status(200).json({
    success: true,
    data: result,
  });
});
const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);
  const result = await CategoryServices.getCategoryById(id);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);
  const result = await CategoryServices.deleteCategoryFromDB(id);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const {id}=req.params
  const result = await CategoryServices.updateCategoryInToDb(id,req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getCategorys,
  getCategoryById,
  deleteCategory,
  updateCategory
 
};

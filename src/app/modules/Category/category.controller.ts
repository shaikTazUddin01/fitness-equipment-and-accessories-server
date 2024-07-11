import { Request, Response } from "express";
import { CategoryServices } from "./category.service";


const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategoryInToDb(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};
const getCategorys = async (req: Request, res: Response) => {
  const result = await CategoryServices.getCategoryfromDb();

  res.status(200).json({
    success: true,
    data: result,
  });
};
const getCategoryById = async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);
  const result = await CategoryServices.getCategoryById(id);

  res.status(200).json({
    success: true,
    data: result,
  });
};


export const CategoryController = {
  createCategory,
  getCategorys,
  getCategoryById,
 
};

import { Request, Response } from "express";
import { productServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createProductInToDb(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const getProducts =catchAsync( async (req: Request, res: Response) => {
  const query = req?.query;
  // console.log(query);
  const result = await productServices.getProductfromDb(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
const getProductById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);
  const result = await productServices.getProductById(id);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//Delete Product
const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);
  const result = await productServices.deleteProductfromDb(id);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//UPdate Product
const updateProductById =catchAsync( async (req: Request, res: Response) => {
  const { id } = req.params;
  const detail = req.body;
  // console.log(id,detail);
  const result = await productServices.updateProductfromDb(id, detail);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const productController = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};

import { Request, Response } from "express";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const result = await productServices.createProductInToDb(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};
const getProducts = async (req: Request, res: Response) => {
  const query = req?.query;
  console.log(query);
  const result = await productServices.getProductfromDb(query);

  res.status(200).json({
    success: true,
    data: result,
  });
};
const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);
  const result = await productServices.getProductById(id);

  res.status(200).json({
    success: true,
    data: result,
  });
};
//Delete Product
const deleteProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id);
  const result = await productServices.deleteProductfromDb(id);

  res.status(200).json({
    success: true,
    data: result,
  });
};
//UPdate Product
const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const detail = req.body;
  // console.log(id,detail);
  const result = await productServices.updateProductfromDb(id, detail);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const productController = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};

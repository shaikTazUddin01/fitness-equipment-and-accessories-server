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
  const result = await productServices.getProductfromDb();

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const productController = {
  createProduct,
  getProducts
};

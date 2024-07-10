import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductInToDb = async (payload: TProduct) => {
  const result = await Product.create(payload);

  return result;
};
const getProductfromDb = async () => {
  const result = await Product.find();

  return result;
};
const getProductById = async (id: string ) => {
  // console.log(id);
  const result = await Product.findById(id);

  return result;
};

export const productServices = {
  createProductInToDb,
  getProductfromDb,
  getProductById,
};

import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductInToDb = async (payload: TProduct) => {
  const checkProduct = {
    name: payload?.name,
    category: payload?.category,
    price: payload?.price,
  };

  const isExistsProduct = await Product.findOne(checkProduct);

  if (isExistsProduct) {
    const stockQuentity = isExistsProduct!.stockQuentity! + 1;

    const result = Product.findByIdAndUpdate(
      isExistsProduct?._id,
      {
        stockQuentity: stockQuentity,
      },
      {
        new: true,
      }
    );

    return result;
  } else {
    payload.stockQuentity = 1;
    const result = await Product.create(payload);

    return result;
  }
};
const getProductfromDb = async () => {
  const result = await Product.find();

  return result;
};
const getProductById = async (id: string) => {
  // console.log(id);
  const result = await Product.findById(id);

  return result;
};

//delete product
const deleteProductfromDb = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);

  return result;
};
//update product
const updateProductfromDb = async (
  id: string,
  data: Record<string, string>
) => {

  const result = await Product.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  return result;
};

export const productServices = {
  createProductInToDb,
  getProductfromDb,
  getProductById,
  deleteProductfromDb,
  updateProductfromDb,
};

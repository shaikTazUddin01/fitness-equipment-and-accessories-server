import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductInToDb = async (payload: TProduct) => {
  // console.log(payload);
  const checkProduct = {
    name: payload?.name,
    category: payload?.category,
    price: payload?.price,
  };
const {stockQuentity}=payload
  const isExistsProduct = await Product.findOne(checkProduct);

  if (isExistsProduct) {
    const NewStockQuentity = isExistsProduct!.stockQuentity! + Number(stockQuentity!);

    const result = Product.findByIdAndUpdate(
      isExistsProduct?._id,
      {
        stockQuentity: NewStockQuentity,
      },
      {
        new: true,
      }
    );

    return result;
  } else {
    // payload.stockQuentity = 1;
    const result = await Product.create(payload);

    return result;
  }
};
//get product
const getProductfromDb = async (query: any) => {
  let sortedProduct = "-createdAt";

  // eslint-disable-next-line prefer-const
  let selectedCategory: string[] = [];

  if (query?.selectedCategory ) {
    selectedCategory=query?.selectedCategory.split(',').map((category:string)=>category.trim())
  }
  if (query?.sortProductByPrice) {
    const sortByPrice = query?.sortProductByPrice;
    if (sortByPrice == "dsc") {
      sortedProduct = "-price";
    }
    if (sortByPrice == "asc") {
      sortedProduct = "price";
    }
  }

  const searchProduct: { [key: string]: any } = {};
  if (query && query.searchProduct) {
    searchProduct.name = { $regex: query.searchProduct, $options: "i" };
  }
//caltegory filter
  if (selectedCategory.length>0) {
   
    searchProduct.category = {$in:selectedCategory}
  }

  // console.log(query);
  const result = await Product.find(searchProduct).sort(sortedProduct);

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
  const result = await Product.findByIdAndUpdate(id, data, { new: true });

  return result;
};

export const productServices = {
  createProductInToDb,
  getProductfromDb,
  getProductById,
  deleteProductfromDb,
  updateProductfromDb,
};

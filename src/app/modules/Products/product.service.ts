/* eslint-disable prefer-const */
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductInToDb = async (payload: TProduct) => {
  // console.log(payload);
  const checkProduct = {
    name: payload?.name,
    category: payload?.category,
    price: payload?.price,
  };
  const { stockQuentity } = payload;
  const isExistsProduct = await Product.findOne(checkProduct);

  if (isExistsProduct) {
    const NewStockQuentity =
      isExistsProduct!.stockQuentity! + Number(stockQuentity!);

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
  const limit = query.limit ? parseInt(query.limit) : undefined;
  const skip = query.skip ? parseInt(query.skip) : undefined;

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
  if (query && query.feature) {
    searchProduct.isFeature = query?.feature;
  }
  //caltegory filter
  if (query?.selectedCategory) {
    searchProduct.category = { $in: query?.selectedCategory };
  }
  //price range filter
  if (query?.priceRange) {
    const priceFilter = query.priceRange.split(",").map(Number);

    if (priceFilter.length === 2) {
      searchProduct.price = {
        $gt: priceFilter[0],
        $lt: priceFilter[1],
      };
    }
  }
  // console.log(searchProduct);
  // console.log(query);
  // Get total count of products that match the search criteria
  const totalProducts = await Product.countDocuments(searchProduct);

  const result = await Product.find(searchProduct)
    .skip(skip as number)
    .limit(limit as number)
    .sort(sortedProduct);

  return {
    result,
    totalProducts,
  };
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

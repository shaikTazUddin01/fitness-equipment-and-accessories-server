import { TCategory } from "./category.interfacr";
import { Category } from "./category.model";

const createCategoryInToDb = async (payload: TCategory) => {
  const result = await Category.create(payload);

  return result;
};
const getCategoryfromDb = async () => {
  const result = await Category.find();

  return result;
};
const getCategoryById = async (id: string) => {
  // console.log(id);
  const result = await Category.findById(id);

  return result;
};

export const CategoryServices = {
  createCategoryInToDb,
  getCategoryfromDb,
  getCategoryById,
};

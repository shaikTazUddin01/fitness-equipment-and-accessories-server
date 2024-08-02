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
const deleteCategoryFromDB = async (id: string) => {
  // console.log(id);
  const result = await Category.findByIdAndDelete(id);

  return result;
};
const updateCategoryInToDb = async (id: string,data:TCategory) => {


  const result = await Category.findByIdAndUpdate(id,data);

  return result;
};

export const CategoryServices = {
  createCategoryInToDb,
  getCategoryfromDb,
  getCategoryById,
  deleteCategoryFromDB,
  updateCategoryInToDb
};

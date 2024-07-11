import { model, Schema } from "mongoose";
import { TCategory } from "./category.interfacr";


const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true },
 

});

export const Category = model("category", categorySchema);

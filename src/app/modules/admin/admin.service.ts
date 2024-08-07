import { TAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

const createAdminInToDB = async (data: TAdmin) => {
  data.status = "active";
  data.isDeleted = false;
 
  const res = await AdminModel.create(data);
  return res;
};
const getAdminFromDB = async () => {
  const res = await AdminModel.find();

  return res;
};

const getSingleAdminFromDB = async (id: string) => {
  // console.log(id);
  const res = await AdminModel.findById(id);
  return res;
};

export const adminService = {
  getAdminFromDB,
  getSingleAdminFromDB,
  createAdminInToDB,
};
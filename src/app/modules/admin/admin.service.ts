import { TAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

const createAdminInToDB = async (data: TAdmin) => {
  data.status = "active";
  data.isDeleted = false;

  const res = await AdminModel.create(data);
  return res;
};
const getAdminFromDB = async (email: string | undefined | null) => {
  const searchCriteria: any = { isDeleted: false };
  if (email != "[object Object]") {
    searchCriteria.email = email;
  }

  const res = await AdminModel.find(searchCriteria);
  return res;
};

const getSingleAdminFromDB = async (id: string) => {
  // console.log(id);
  const res = await AdminModel.findById(id);
  return res;
};
const deleteAdminFromDB = async (id: string) => {
  // console.log(id);
  const res = await AdminModel.findByIdAndUpdate(id, { isDeleted: true });
  return res;
};
const updateAdminIntoDB = async (id: string, data: Partial<TAdmin>) => {
  // console.log(id,data);
  // const user=
  const res = await AdminModel.findByIdAndUpdate(id, data);
  return res;
};
const updatePassword = async (email: string, data: Partial<TAdmin>) => {
  // console.log(id,data);
  // const user=
  console.log("--->",email,data);
  // const res = await AdminModel.findByIdAndUpdate(email, data);
  const res=0
  return res;
};

export const adminService = {
  getAdminFromDB,
  getSingleAdminFromDB,
  createAdminInToDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  updatePassword
};

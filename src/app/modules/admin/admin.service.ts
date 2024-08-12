import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { TAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";
import bcrypt from "bcrypt";
import config from "../../config";
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
const updatePassword = async (email: string, data: Record<string, string>) => {
  const isUserExists = await AdminModel.findOne({ email });
  if (!isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
  }
  const hashPassword = isUserExists.password;
  const isOldPasswordmatched = await bcrypt.compare(
    data.oldPassword,
    hashPassword
  );
  if (!isOldPasswordmatched) {
    throw new AppError(httpStatus.NOT_FOUND, "your old password is incorrect");
  }
  
  const newPassword =await  bcrypt.hash(
    data?.newPassword,
    Number(config.saltRounds)
  );

  const res = await AdminModel.findOneAndUpdate({email}, {password:newPassword});



  return res;
};

export const adminService = {
  getAdminFromDB,
  getSingleAdminFromDB,
  createAdminInToDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  updatePassword,
};

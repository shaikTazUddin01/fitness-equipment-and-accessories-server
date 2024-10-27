import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInToDB = async (data: TUser) => {
  const email = data.email;
  const phoneNumber = data.phoneNumber as string;
  const isUserExists = await UserModel.findOne({ email, phoneNumber });

  if (isUserExists) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "this email is alreary used,please use another email"
    );
  }

  data.isDeleted = false;
  data.role = "user";
  const res = await UserModel.create(data);

  return res;
};
const getUserFromDB = async () => {
  const res = await UserModel.find();
  return res;
};

const getSingleUserFromDB = async (email: string) => {
  const res = await UserModel.findOne({ email });

  return res;
};
const deleteSingleUserFromDB = async (id: string) => {
  const res = await UserModel.findByIdAndDelete(id);

  return res;
};
const updateUserFromDB = async (id: string, payload: any) => {
  // console.log(id,payload);
  const data=payload?.userData
  // console.log(data);
  const res = await UserModel.updateOne({ _id: id }, data, { new: true });
  // console.log(res);
  return res;
};

export const UserService = {
  getUserFromDB,
  getSingleUserFromDB,
  createUserInToDB,
  deleteSingleUserFromDB,
  updateUserFromDB,
};

import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInToDB = async (data: TUser) => {
console.log(data);
  const email=data.email
  const phoneNumber=data.phoneNumber as string
  const isUserExists=await UserModel.findOne({email})

 if (isUserExists) {
  throw new AppError(httpStatus.FORBIDDEN,'this email is alreary used,please use another email')
 }
 if (isUserExists!.phoneNumber == phoneNumber) {
  throw new AppError(httpStatus.FORBIDDEN,'this Phone Number is alreary used,please use another Phone Number')
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
  const res = await UserModel.findOne({email});

  return res;
};
const deleteSingleUserFromDB = async (id: string) => {
  const res = await UserModel.findByIdAndDelete(id);

  return res;
};


export const UserService = {
  getUserFromDB,
  getSingleUserFromDB,
  createUserInToDB,
  deleteSingleUserFromDB
};

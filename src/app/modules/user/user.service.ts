import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInToDB = async (data: TUser) => {
  data.isDeleted = false;
  data.role = "user";
  const res = await UserModel.create(data);

  return res;
};
const getUserFromDB = async () => {
  const res = await UserModel.find();
  return res;
};

const getSingleUserFromDB = async (id: string) => {
  const res = await UserModel.findById(id);

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

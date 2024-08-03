import { AdminModel } from "../admin/admin.model";
import { TAuth } from "./auth.interface";
// import { AuthModel } from "./auth.model";

const login = async (data: TAuth) => {
  const isUserExists = await AdminModel.find({ email: data?.email });

  console.log(isUserExists);
  if (!isUserExists) {
    throw new Error("the user is not exists");
  }

  return data;
};

export const authServices = {
  login,
};

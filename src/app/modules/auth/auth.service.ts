import jwt from "jsonwebtoken";
import { AdminModel } from "../admin/admin.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
// import { AuthModel } from "./auth.model";

const login = async (data: TAuth) => {
  const isUserExists = await AdminModel.findOne({ email: data?.email });

  if (!isUserExists) {
    throw new Error("you are not authorized");
  }
  const plainPassword = data.password;
  const hashedPassword = isUserExists.password;

  const isPasswordmatched = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordmatched) {
    throw new Error("something is wrong please try with right information");
  }
  const jwtPayload = {
    user: isUserExists?.email,
    role: isUserExists?.role,
  };

  const access_Token = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expressIn,
    }
  );
  // const refresh_Token = jwt.sign(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   {
  //     expiresIn: config.jwt_refresh_expressIn,
  //   }
  // );
  return {
    accessToken: access_Token,
    // refreshToken: refresh_Token,
  };
};

export const authServices = {
  login,
};

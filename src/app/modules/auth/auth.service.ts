// import jwt from "jsonwebtoken";
import { AdminModel } from "../admin/admin.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { createToken } from "./auth.utilis";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../errors/AppErrors";
import httpStatus from "http-status";
import { UserModel } from "../user/user.model";
// import { AuthModel } from "./auth.model";

//admin login
const AdminLogin = async (data: TAuth) => {
  const isUserExists = await AdminModel.findOne({ email: data?.email });

  if (!isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized");
  }
  const plainPassword = data.password;
  const hashedPassword = isUserExists.password;

  const isPasswordmatched = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordmatched) {
    throw new AppError(httpStatus.FORBIDDEN,"something is wrong please try with right information");
  }
  const jwtPayload = {
    user: isUserExists?.email,
    role: isUserExists?.role,
  };
  // access token
  const access_Token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expressIn as string
  );
  //  refresh token
  const refresh_Token = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expressIn as string
  );

  return {
    accessToken: access_Token,
    refreshToken: refresh_Token,
  };
};
//user Login
const UserLogin = async (data: TAuth) => {
  const isUserExists = await UserModel.findOne({ email: data?.email });

  console.log(isUserExists);
  if (!isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized");
  }
  const plainPassword = data.password;
  const hashedPassword = isUserExists.password;

  const isPasswordmatched = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordmatched) {
    throw new AppError(httpStatus.FORBIDDEN,"something is wrong please try with right information");
  }
  const jwtPayload = {
    user: isUserExists?.email,
    role: isUserExists?.role,
  };
  // access token
  const access_Token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expressIn as string
  );
  //  refresh token
  const refresh_Token = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expressIn as string
  );

  return {
    accessToken: access_Token,
    refreshToken: refresh_Token,
  };
};
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED,"yor are not authorization");
  }

  //verify token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const user = (decoded as JwtPayload)?.user;
  // const role = (decoded as JwtPayload)?.role;
  //check user exists or not
  const isUserExists = await AdminModel.findOne({ email: user });
  if (!isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization");
  }
  //check status and isDeleted is ok or not
  if (isUserExists.status !== "active" || isUserExists.isDeleted == true) {
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization");
  }

  const jwtPayload = {
    user: isUserExists?.email,
    role: isUserExists?.role,
  };

const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expressIn as string
  );


  return {
    accessToken
  };
};

export const authServices = {
  AdminLogin,
  UserLogin,
  refreshToken,
};

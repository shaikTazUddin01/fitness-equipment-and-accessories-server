import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TAdminRole } from "../modules/admin/admin.interface";
import { AdminModel } from "../modules/admin/admin.model";
import { AppError } from "../errors/AppErrors";
import httpStatus from "http-status";

const auth = (...requiredRoles: TAdminRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED,"yor are not authorization");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string);
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization");
    }

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization");
    }
    const role = (decoded as JwtPayload)?.role;
    const user = (decoded as JwtPayload)?.user;
    //check user exists or not
    const isUserExists = await AdminModel.findOne({ email: user });
    if (!isUserExists) {
      throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization");
    }
    //check status and isDeleted is ok or not
    if (isUserExists.status !== "active" || isUserExists.isDeleted == true) {
      throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization");
    }
    // console.log(role,requiredRoles);
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorization");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;

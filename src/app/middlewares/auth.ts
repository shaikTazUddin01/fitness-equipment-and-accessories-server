/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

import { AdminModel } from "../modules/admin/admin.model";
import { AppError } from "../errors/AppErrors";
import httpStatus from "http-status";
import { TAuthRole } from "../modules/admin/admin.interface";

const auth = (...requiredRoles: TAuthRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "yor are not authorization");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string);
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorization");
    }
    // console.log(decoded);
    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorization");
    }
    const role = (decoded as JwtPayload)?.role;
    const user = (decoded as JwtPayload)?.user;
    let isUserExists;

// console.log(role);

    //check user exists or not
    isUserExists = await AdminModel.findOne({ email: user });

    // console.log(isUserExists);

    if (!isUserExists) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorization");
    }
    // console.log('object');
    //check status and isDeleted is ok or not
    if (isUserExists.status == "block" || isUserExists.isDeleted == true) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorization");
    }
    // console.log("role-->",role,requiredRoles);
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorization");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;

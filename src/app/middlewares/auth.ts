import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TAdminRole } from "../modules/admin/admin.interface";
import { AdminModel } from "../modules/admin/admin.model";

const auth = (...requiredRoles: TAdminRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("yor are not authorization");
    }

    //verify token
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      async function (err, decoded) {
        if (err) {
          throw new Error("you are not authorization");
        }

        const role = (decoded as JwtPayload)?.role;
        const user = (decoded as JwtPayload)?.user;
        //check user exists or not
        const isUserExists = await AdminModel.findOne({ email: user });
        if (!isUserExists) {
          throw new Error("you are not authorization");
        }
        //check status and isDeleted is ok or not
        if (
          isUserExists.status !== "active" ||
          isUserExists.isDeleted == true
        ) {
          throw new Error("you are not authorization");
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new Error("you are not authorization");
        }
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;

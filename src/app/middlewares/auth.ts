import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TAdminRole } from "../modules/admin/admin.interface";

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
      function (err, decoded) {
        if (err) {
          throw new Error("you are not authorization");
        }

        const role = (decoded as JwtPayload)?.role;
        const status = (decoded as JwtPayload)?.status;
        const isDeleted = (decoded as JwtPayload)?.isDeleted;

        console.log(status);

        if (status !== 'active' || isDeleted == true) {
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

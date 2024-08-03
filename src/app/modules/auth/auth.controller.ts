import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.login(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
};

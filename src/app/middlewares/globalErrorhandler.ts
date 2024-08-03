/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler:ErrorRequestHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "something went wrong.!";

    return res.status(statusCode).json({
        success:false,
        message,
        error:err
    })
}

export default globalErrorHandler
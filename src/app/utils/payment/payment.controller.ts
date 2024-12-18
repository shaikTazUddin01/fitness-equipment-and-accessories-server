import { Request, Response } from "express";
import { paymentServices } from "./payment.service";



const confirmationController = async (req: Request, res: Response) => {
  // console.log(req.query);
  const result = await paymentServices.confirmationServices(
    req.query as Record<string, string>
  );
  res.send(result)
};

export const paymentController = {
  confirmationController,
};
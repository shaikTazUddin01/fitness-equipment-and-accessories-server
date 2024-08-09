import catchAsync from "../../utils/catchAsync";
import { customerService } from "./customer.service";

const findCustomer=catchAsync(async(req,res)=>{
    const result= await customerService.findCustomerFromDB()

    
  res.status(200).json({
    success: true,
    data: result,
  });

})

export const customerController={
    findCustomer
}
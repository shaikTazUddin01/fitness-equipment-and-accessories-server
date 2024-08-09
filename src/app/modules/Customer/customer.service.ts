import { CustomerModel } from "./customer.model"

const findCustomerFromDB=async()=>{
    const res=await CustomerModel.find()
    return res;
}

export const customerService={
    findCustomerFromDB
}
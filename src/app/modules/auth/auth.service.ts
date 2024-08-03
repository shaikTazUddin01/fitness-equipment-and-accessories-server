import { TAuth } from "./auth.interface";
// import { AuthModel } from "./auth.model";

const login= async (data: TAuth) => {
 

  console.log(data);

 

  return data;
};

export const authServices = {
 login
};

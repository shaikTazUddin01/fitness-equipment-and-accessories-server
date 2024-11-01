import { ROLE } from "./admin.constant";


export type TAdmin = {
  name: string;
  email: string;
  phoneNumber: string;
  role?: "Admin" | "SubAdmin";
  password: string;
  age: number;
  address: string;
  status: string;
  image?:string;
  isDeleted: boolean;
  gender: "Male" | "Female" | "Other";
};

export type TAuthRole = keyof typeof ROLE;

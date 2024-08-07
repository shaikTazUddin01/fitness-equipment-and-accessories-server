import { ADMIN_ROLE } from "./admin.constant";

export type TAdmin = {
  name: string;
  email: string;
  phoneNumber: string;
  role?: "Admin" | "SubAdmin";
  password: string;
  age: number;
  address: string;
  status: string;
  isDeleted: boolean;
  gender: "Male" | "Female" | "Other";
};

export type TAdminRole = keyof typeof ADMIN_ROLE;

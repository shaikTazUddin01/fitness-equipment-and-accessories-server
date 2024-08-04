import { ADMIN_ROLE } from "./admin.constant";

export type TAdmin = {
  role?: 'admin' | 'subadmin';
  name: string;
  status:string;
  isDeleted:boolean;
  email: string;
  password: string;
};


export type TAdminRole= keyof typeof ADMIN_ROLE;
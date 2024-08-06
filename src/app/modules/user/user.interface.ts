export type TUser = {
  address: string;
  age: number;
  email:string;
  gender: "Male"|"Female"|"Other";
  name: string;
  password: string;
  phoneNumber: string;
  role?:'user';
  isDeleted:boolean;
};

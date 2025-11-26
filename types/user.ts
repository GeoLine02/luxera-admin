export interface UserRegisterType {
  fullName: string;
  email: string;
  password: string;
}

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserType {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

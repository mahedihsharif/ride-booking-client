export interface IUserResponseData {
  name: string;
  email: string;
  role: string;
  phone: string;
  isActive: string;
  cancelAttempts?: number;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

//login response data
export interface ILoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: IUserResponseData;
}
//login post types
export interface ILogin {
  email: string;
  password: string;
}

export interface IPasswordInfo {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IDriverData {
  _id: string;
  user: string;
  isAvailable: string;
  isApprovedStatus?: string;
  vehicle?: Vehicle;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Vehicle {
  type: string;
  model: string;
  licensePlate: string;
  color: string;
}

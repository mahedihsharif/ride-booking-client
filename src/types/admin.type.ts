import type { IUserResponseData } from "./auth.type";

export interface IAllRiders {
  riders: IUserResponseData[];
  meta: Meta;
}
export interface IAllDrivers {
  drivers: IUserResponseData[];
  meta: Meta;
}
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IParamsUsers {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export type IActiveParams = {
  isActive: string;
};

export interface IResponseDriverData {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  isApprovedStatus: string;
}

export interface IParamsRides {
  page?: number;
  limit?: number;
  status?: string;
  driver?: string;
  rider?: string;
  startDate?: string;
  endDate?: string;
}

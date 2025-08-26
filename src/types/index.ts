import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import type { IErrorData } from "./error.type";

export type {
  IDriverData,
  ILogin,
  ILoginResponseData,
  IPasswordInfo,
  IRegister,
  IUserResponseData,
} from "./auth.type";

export type {
  IDriverRideData,
  IRideData,
  IRideRequest,
  ISingleRideData,
  RideId,
} from "./ride.type";

export interface IResponse<T> {
  slice(arg0: number, arg1: number): unknown;
  success: boolean;
  message: string;
  data: T;
}
export interface IErrorResponse {
  data: IErrorData;
  status: number;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
    icon?: LucideIcon;
  }[];
}

export type TRole = "ADMIN" | "RIDER" | "DRIVER";
export interface IParams {
  page?: number;
  limit?: number;
  status?: string;
  fareMin?: number;
  fareMax?: number;
  dateFrom?: string;
  dateTo?: string;
}

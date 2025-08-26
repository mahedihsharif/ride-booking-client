import type { Meta } from "./admin.type";

export interface IDriver {
  meta: Meta;
  drivers: IDriverData[];
}

export interface IDriverData {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  isApprovedStatus?: string;
}

export interface IRideData {
  meta: Meta;
  data: ISingleRideDataForAdmin[];
}

export interface Meta {
  total: number;
}

export interface ISingleRideData {
  _id: string;
  rider: Rider;
  pickupLocation: PickupLocation;
  destinationLocation: DestinationLocation;
  status: string;
  paymentMethod: string;
  history?: History[];
  createdAt?: Date;
  updatedAt?: Date;
  fare: number;
  driver?: Driver;
}

export interface ISingleRideDataForAdmin {
  _id: string;
  rider: Rider;
  pickupLocation: PickupLocation;
  destinationLocation: DestinationLocation;
  status: string;
  paymentMethod: string;
  history?: History[];
  createdAt?: string;
  updatedAt?: string;
  fare: number;
  driver?: Driver;
}

export interface Rider {
  _id: string;
  name?: string;
  email?: string;
}
export interface Driver {
  _id: string;
  name?: string;
  email?: string;
}
export interface PickupLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface DestinationLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface History {
  status: string;
  timestamp: string;
}
export interface PickupAddress {
  address: string;
}

export interface DestinationAddress {
  address: string;
}
export interface IRideRequest {
  pickupLocation: PickupAddress;
  destinationLocation: DestinationAddress;
  paymentMethod: string;
}

export type RideId = string;

export interface IDriverRideData {
  rides: ISingleRideData[];
}

export type RideIdParams = {
  id: string;
};

export type IStatus = {
  status: string;
};

export interface EarningsStats {
  totalCount: number;
  totalEarning: number;
  avgEarning: number;
  daily: number;
  earningLast7Days: number;
  earningLast30Days: number;

  series?: { date: string; earning: number }[];
}

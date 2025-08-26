import { baseApi } from "@/redux/baseApi";
import type {
  IDriverData,
  IDriverRideData,
  IParams,
  IResponse,
  IRideData,
  ISingleRideData,
} from "@/types";
import type { EarningsStats, IStatus, RideId } from "@/types/ride.type";
import type { IVehicle } from "@/types/vehicle.type";

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverInfo: builder.query<IResponse<IDriverData>, undefined>({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),
    driverRidesInfo: builder.query<IResponse<IRideData>, IParams>({
      query: (params) => ({
        url: "rides/driver/me",
        method: "GET",
        params,
      }),
      providesTags: ["RIDE"],
    }),
    driverAvailability: builder.mutation<IResponse<IDriverData>, void>({
      query: () => ({
        url: `/drivers/availability`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    //test
    getDriverRides: builder.query<IResponse<IRideData>, void>({
      query: () => ({
        url: "/rides/completed",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    // Pending ride requests for driver (only when available)
    getRequestRides: builder.query<IResponse<IDriverRideData>, void>({
      query: () => ({
        url: "/rides/available",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    // Accept ride
    acceptRide: builder.mutation<IResponse<IRideData>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Reject ride
    rejectRide: builder.mutation<IResponse<IRideData>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),
    //status update
    statusUpdateRide: builder.mutation<
      IResponse<IRideData>,
      { rideId: string; status: IStatus }
    >({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/status`,
        method: "PATCH",
        data: status,
      }),
      invalidatesTags: (_result, _error, { rideId }) => [
        { type: "RIDE", id: rideId },
      ],
    }),
    singleRide: builder.query<IResponse<ISingleRideData>, RideId>({
      query: (id) => ({
        url: `/rides/ride/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
    earningState: builder.query<IResponse<EarningsStats>, undefined>({
      query: () => ({
        url: "/stats/earnings",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
    //status update
    vehicleUpdate: builder.mutation<
      IResponse<IRideData>,
      { vehicleInfo: Partial<IVehicle> }
    >({
      query: ({ vehicleInfo }) => ({
        url: "/vehicle",
        method: "PATCH",
        data: vehicleInfo,
      }),
      invalidatesTags: ["DRIVER"],
    }),
  }),
});

export const {
  useDriverInfoQuery,
  useDriverAvailabilityMutation,
  useAcceptRideMutation,
  useRejectRideMutation,
  useGetDriverRidesQuery,
  useGetRequestRidesQuery,
  useDriverRidesInfoQuery,
  useStatusUpdateRideMutation,
  useEarningStateQuery,
  useSingleRideQuery,
  useVehicleUpdateMutation,
} = driverApi;

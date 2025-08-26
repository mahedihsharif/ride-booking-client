import { baseApi } from "@/redux/baseApi";
import type {
  IParams,
  IResponse,
  IRideData,
  IRideRequest,
  ISingleRideData,
  RideId,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rides: builder.mutation<IResponse<ISingleRideData>, IRideRequest>({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        data: rideInfo,
      }),
    }),

    riderRidesInfo: builder.query<IResponse<IRideData>, IParams>({
      query: (params) => ({
        url: "/rides/me",
        method: "GET",
        params,
      }),
      providesTags: ["RIDE"],
    }),
    riderSingleRideInfo: builder.query<IResponse<ISingleRideData>, RideId>({
      query: (id) => ({
        url: `/rides/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useRiderRidesInfoQuery,
  useRiderSingleRideInfoQuery,
  useRidesMutation,
} = authApi;

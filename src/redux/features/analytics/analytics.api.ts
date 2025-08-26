/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../auth/auth.api";

export const analyticsApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getRideVolume: builder.query<any, void>({
      query: () => ({
        url: "/analytics/ride-volume",
        method: "GET",
      }),
    }),
    getRevenueTrends: builder.query<any, void>({
      query: () => ({
        url: "/analytics/revenue-trends",
        method: "GET",
      }),
    }),
    getDriverActivity: builder.query<any, void>({
      query: () => ({
        url: "/analytics/driver-activity",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetRideVolumeQuery,
  useGetRevenueTrendsQuery,
  useGetDriverActivityQuery,
} = analyticsApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from "../auth/auth.api";
export const analyticsApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getRideVolume: builder.query({
            query: () => ({
                url: "/analytics/ride-volume",
                method: "GET",
            }),
        }),
        getRevenueTrends: builder.query({
            query: () => ({
                url: "/analytics/revenue-trends",
                method: "GET",
            }),
        }),
        getDriverActivity: builder.query({
            query: () => ({
                url: "/analytics/driver-activity",
                method: "GET",
            }),
        }),
    }),
});
export const { useGetRideVolumeQuery, useGetRevenueTrendsQuery, useGetDriverActivityQuery, } = analyticsApi;

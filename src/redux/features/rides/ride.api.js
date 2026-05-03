import { baseApi } from "@/redux/baseApi";
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        rides: builder.mutation({
            query: (rideInfo) => ({
                url: "/rides/request",
                method: "POST",
                data: rideInfo,
            }),
        }),
        riderRidesInfo: builder.query({
            query: (params) => ({
                url: "/rides/me",
                method: "GET",
                params,
            }),
            providesTags: ["RIDE"],
        }),
        riderSingleRideInfo: builder.query({
            query: (id) => ({
                url: `/rides/ride/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        getRideById: builder.query({
            query: (id) => ({
                url: `/rides/active/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        getSingleRide: builder.query({
            query: (id) => ({
                url: `/rides/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
    }),
});
export const { useRiderRidesInfoQuery, useRiderSingleRideInfoQuery, useRidesMutation, useGetRideByIdQuery, useGetSingleRideQuery, } = authApi;

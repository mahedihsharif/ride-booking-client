import { baseApi } from "@/redux/baseApi";
const driverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        driverInfo: builder.query({
            query: () => ({
                url: "/drivers/me",
                method: "GET",
            }),
            providesTags: ["DRIVER"],
        }),
        driverRidesInfo: builder.query({
            query: (params) => ({
                url: "rides/driver/me",
                method: "GET",
                params,
            }),
            providesTags: ["RIDE"],
        }),
        driverAvailability: builder.mutation({
            query: () => ({
                url: `/drivers/availability`,
                method: "PATCH",
            }),
            invalidatesTags: ["DRIVER"],
        }),
        //test
        getDriverRides: builder.query({
            query: () => ({
                url: "/rides/completed",
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        // Pending ride requests for driver (only when available)
        getRequestRides: builder.query({
            query: () => ({
                url: "/rides/available",
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        // Accept ride
        acceptRide: builder.mutation({
            query: (rideId) => ({
                url: `/rides/${rideId}/accept`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDE"],
        }),
        // Reject ride
        rejectRide: builder.mutation({
            query: (rideId) => ({
                url: `/rides/${rideId}/reject`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDE"],
        }),
        //status update
        statusUpdateRide: builder.mutation({
            query: ({ rideId, status }) => ({
                url: `/rides/${rideId}/status`,
                method: "PATCH",
                data: status,
            }),
            invalidatesTags: ["RIDE"],
        }),
        singleRide: builder.query({
            query: (id) => ({
                url: `/rides/ride/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        earningState: builder.query({
            query: () => ({
                url: "/stats/earnings",
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        //status update
        vehicleUpdate: builder.mutation({
            query: ({ vehicleInfo }) => ({
                url: "/vehicle",
                method: "PATCH",
                data: vehicleInfo,
            }),
            invalidatesTags: ["DRIVER"],
        }),
    }),
});
export const { useDriverInfoQuery, useDriverAvailabilityMutation, useAcceptRideMutation, useRejectRideMutation, useGetDriverRidesQuery, useGetRequestRidesQuery, useDriverRidesInfoQuery, useStatusUpdateRideMutation, useEarningStateQuery, useSingleRideQuery, useVehicleUpdateMutation, } = driverApi;

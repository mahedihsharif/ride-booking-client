import { baseApi } from "@/redux/baseApi";
const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        ridersInfo: builder.query({
            query: (params) => ({
                url: "/users/riders",
                method: "GET",
                params,
            }),
            providesTags: ["ADMIN"],
        }),
        //driver info
        driversInfo: builder.query({
            query: (params) => ({
                url: "/drivers/status-info",
                method: "GET",
                params,
            }),
            providesTags: ["ADMIN"],
        }),
        //rides info
        ridesInfo: builder.query({
            query: (params) => ({
                url: "/rides",
                method: "GET",
                params,
            }),
            providesTags: ["RIDE"],
        }),
        // rider active status
        ridersActiveStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/users/block/${id}`,
                method: "PATCH",
                data: status,
            }),
            invalidatesTags: ["ADMIN"],
        }),
        //approved
        approvedDriver: builder.mutation({
            query: ({ id }) => ({
                url: `/drivers/approve/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["ADMIN"],
        }),
        //suspend
        suspendDriver: builder.mutation({
            query: ({ id }) => ({
                url: `/drivers/suspend/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["ADMIN"],
        }),
    }),
});
export const { useRidersInfoQuery, useDriversInfoQuery, useRidersActiveStatusMutation, useApprovedDriverMutation, useSuspendDriverMutation, useRidesInfoQuery, } = adminApi;

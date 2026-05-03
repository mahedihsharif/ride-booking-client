import { baseApi } from "@/redux/baseApi";
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["AUTH"],
        }),
        changePassword: builder.mutation({
            query: (userPassInfo) => ({
                url: "/auth/change-password",
                method: "POST",
                data: userPassInfo,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["AUTH"],
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/users/register",
                method: "POST",
                data: userInfo,
            }),
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["AUTH"],
        }),
        updateProfile: builder.mutation({
            query: ({ id, userInfo }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                data: userInfo,
            }),
            invalidatesTags: ["AUTH"],
        }),
    }),
});
export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUpdateProfileMutation, useChangePasswordMutation, useUserInfoQuery, } = authApi;

import { baseApi } from "@/redux/baseApi";
import type {
  ILogin,
  ILoginResponseData,
  IPasswordInfo,
  IRegister,
  IResponse,
  IUserResponseData,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponseData>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    changePassword: builder.mutation<IResponse<null>, IPasswordInfo>({
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
    register: builder.mutation<IResponse<IUserResponseData>, IRegister>({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    userInfo: builder.query<IResponse<IUserResponseData>, undefined>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["AUTH"],
    }),
    updateProfile: builder.mutation<
      IResponse<IUserResponseData>,
      { id: string; userInfo: Partial<IUserResponseData> }
    >({
      query: ({ id, userInfo }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["AUTH"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUserInfoQuery,
} = authApi;

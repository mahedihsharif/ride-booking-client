import { baseApi } from "@/redux/baseApi";
import type {
  IDriverData,
  IResponse,
  IRideData,
  IUserResponseData,
} from "@/types";
import type {
  IActiveParams,
  IAllRiders,
  IParamsRides,
  IParamsUsers,
} from "@/types/admin.type";
import type { IDriver } from "@/types/driver.type";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ridersInfo: builder.query<IResponse<IAllRiders>, IParamsUsers>({
      query: (params) => ({
        url: "/users/riders",
        method: "GET",
        params,
      }),
      providesTags: ["ADMIN"],
    }),

    //driver info
    driversInfo: builder.query<IResponse<IDriver>, IParamsUsers>({
      query: (params) => ({
        url: "/drivers/status-info",
        method: "GET",
        params,
      }),
      providesTags: ["ADMIN"],
    }),

    //rides info
    ridesInfo: builder.query<IResponse<IRideData>, IParamsRides>({
      query: (params) => ({
        url: "/rides",
        method: "GET",
        params,
      }),
      providesTags: ["RIDE"],
    }),

    // rider active status
    ridersActiveStatus: builder.mutation<
      IResponse<IUserResponseData>,
      { id: string; status: IActiveParams }
    >({
      query: ({ id, status }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        data: status,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    //approved
    approvedDriver: builder.mutation<IResponse<IDriverData>, { id: string }>({
      query: ({ id }) => ({
        url: `/drivers/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),

    //suspend
    suspendDriver: builder.mutation<IResponse<IDriverData>, { id: string }>({
      query: ({ id }) => ({
        url: `/drivers/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
  }),
});

export const {
  useRidersInfoQuery,
  useDriversInfoQuery,
  useRidersActiveStatusMutation,
  useApprovedDriverMutation,
  useSuspendDriverMutation,
  useRidesInfoQuery,
} = adminApi;

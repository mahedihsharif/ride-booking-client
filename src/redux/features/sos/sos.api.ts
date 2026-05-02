import { baseApi } from "@/redux/baseApi";

export const sosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendSOS: builder.mutation({
      query: (payload) => ({
        url: "/sos/send",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { useSendSOSMutation } = sosApi;

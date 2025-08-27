import { baseApi } from "@/redux/baseApi";
import type { SendMessagePayload } from "@/types/sms.api";

export const smsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendSMS: builder.mutation<
      { success: boolean; sid: string },
      SendMessagePayload
    >({
      query: (payload) => ({
        url: "/send-sms",
        method: "POST",
        body: payload,
      }),
    }),
    sendWhatsApp: builder.mutation<
      { success: boolean; sid: string },
      SendMessagePayload
    >({
      query: (payload) => ({
        url: "/send-whatsapp",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSendSMSMutation, useSendWhatsAppMutation } = smsApi;

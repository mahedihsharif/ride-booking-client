import { baseApi } from "@/redux/baseApi";
export const smsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendSMS: builder.mutation({
            query: (payload) => ({
                url: "/send-sms",
                method: "POST",
                body: payload,
            }),
        }),
        sendWhatsApp: builder.mutation({
            query: (payload) => ({
                url: "/send-whatsapp",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});
export const { useSendSMSMutation, useSendWhatsAppMutation } = smsApi;

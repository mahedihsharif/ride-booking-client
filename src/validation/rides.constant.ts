import { payment } from "@/constants/payment.constant";
import z from "zod";

export const rideSchema = z.object({
  pickupLocation: z.object({
    address: z.string().min(3, "Pickup address required"),
  }),
  destinationLocation: z.object({
    address: z.string().min(3, "Destination address required"),
  }),
  paymentMethod: z.enum([payment.CASH, payment.BKASH, payment.NAGAD] as const, {
    message: "Role must be either CASH or BKASH or NAGAD",
  }),
});

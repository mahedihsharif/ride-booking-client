import z from "zod";

export const vehicleSchema = z.object({
  type: z
    .string()

    .optional(),
  model: z.string().optional(),
  licensePlate: z.string().optional(),
});

import { activeUser } from "@/constants/admin.constant";
import z from "zod";

export const userSchema = z.object({
  isActive: z.enum([activeUser.ACTIVE, activeUser.BLOCKED] as const, {
    message: "Active Status must be either ACTIVE or BLOCKED  ",
  }),
});

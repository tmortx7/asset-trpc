import * as z from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signUpSchema = createUserSchema .extend({
  username: z.string(),
});

export type ILogin = z.infer<typeof createUserSchema >;
export type ISignUp = z.infer<typeof signUpSchema>;
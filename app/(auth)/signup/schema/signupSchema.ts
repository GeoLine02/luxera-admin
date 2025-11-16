import z from "zod";

const signupSchema = z.object({
  fullName: z.string().min(3, "Full name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export default signupSchema;

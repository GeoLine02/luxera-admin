import api from "@/utils/axios";
import signupSchema from "../schema/signupSchema";
import { UserRegisterType } from "@/types/user";

export const registerUserService = async (creds: UserRegisterType) => {
  const validatedData = signupSchema.safeParse(creds);

  if (!validatedData.success) {
    return {
      ok: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await api.post("/auth/register", validatedData.data);
    return { ok: true, data: res.data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ok: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

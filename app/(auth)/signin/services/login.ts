import { UserLoginType } from "@/types/user";
import signinSchema from "../schema/singinSchema";
import api from "@/utils/axios";

export const loginUserService = async (creds: UserLoginType) => {
  const validatedData = signinSchema.safeParse(creds);

  if (!validatedData.success) {
    return {
      ok: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await api.post("/auth/login", validatedData.data);
    return { ok: true, data: res.data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ok: false,
      messsage: error?.response?.data?.message || "Something went wrong",
    };
  }
};

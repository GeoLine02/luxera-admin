"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import signupSchema from "./schema/signupSchema";
import { registerUserService } from "./services/register";
import { UserRegisterType } from "@/types/user";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterType>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: UserRegisterType) => {
    console.log("enters");
    try {
      const res = await registerUserService(data);

      if (!res.ok) {
        if (res.message) setServerError(res.message);
        return;
      }

      reset();

      if (res.data) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border rounded-2xl p-4">
          <Card.Header>
            <Card.Title className="text-center text-2xl font-semibold">
              Create an Account
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {serverError && (
                <p className="text-sm text-red-500">{serverError}</p>
              )}

              <Button
                disabled={isSubmitting}
                type="submit"
                variant="default"
                size="lg"
                className="w-full py-2 rounded-xl"
              >
                {isSubmitting ? <ClipLoader /> : "Sign Up"}
              </Button>
            </form>
          </Card.Content>
        </Card>
      </motion.div>
    </div>
  );
}

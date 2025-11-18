"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import signinSchema from "./schema/singinSchema";
import { loginUserService } from "./services/login";
import { UserLoginType } from "@/types/user";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

type FormData = z.infer<typeof signinSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(signinSchema) });
  const router = useRouter();

  const onSubmit = async (data: UserLoginType) => {
    try {
      const res = await loginUserService(data);

      if (!res.ok) {
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
    <div className="flex min-h-screen justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border rounded-2xl p-4">
          <Card.Header>
            <Card.Title className="text-center text-2xl font-semibold">
              Sign In
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-blue-100">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  variant="default"
                  className="bg-blue-800 placeholder-blue-300"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-blue-100">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    variant="default"
                    className="bg-blue-800 placeholder-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="default"
                size="lg"
                className="w-full py-2 rounded-xl"
              >
                {isSubmitting ? <ClipLoader color="white" /> : "Sign In"}
              </Button>
            </form>
          </Card.Content>
        </Card>
      </motion.div>
    </div>
  );
}

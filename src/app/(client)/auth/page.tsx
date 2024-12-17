"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // For using Zod with React Hook Form
import { z } from "zod"; // Zod for schema validation
import { Input } from "@/components/ui/input"; // shadcn Input
import { Label } from "@/components/ui/label"; // shadcn Label
import { Button } from "@/components/ui/button"; // shadcn Button
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Zod schema for validation
const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password cannot be longer than 20 characters")
    .min(1, "Password is required"),
});

type TSchemaAdmin = z.infer<typeof schema>;

export default function AdminPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSchemaAdmin>({
    resolver: zodResolver(schema), // Using Zod Resolver
  });

  const onSubmit = async (data: TSchemaAdmin) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res_data = await res.json();

    if (res.ok) {
      toast.success("Admin Successfully LoggedIn");
    } else {
      toast.error(res_data.message || "Failed to Login");
    }
    // toast({
    //   variant: res.ok ? "success" : "destructive",
    //   title: res.ok ? "Success !!" : "Failed !!",
    //   description: res_data.message,
    // });

    if (res.ok) return router.push("/admin/jobs");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}

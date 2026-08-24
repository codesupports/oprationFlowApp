
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { isLoggedInUser } from "../store/slices/requestSlice"
import { useDispatch } from "react-redux";

// Login validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required, use this (test@test.com)")
    .email("Please enter a valid email address, use this (test@test.com)"),

  password: z
    .string()
    .min(1, "Password is required, use this (123456)"),

  rememberMe: z.boolean(),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: any) => {
    setLoginError("");
    // Check login credentials
    if (data.email !== "test@test.com" || data.password !== "123456") {
      setLoginError("Invalid email or password.");
      return;
    }
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      console.log("Login successful");
      // localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(isLoggedInUser(true))
      // Redirect to home page
      router.push("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Opration-Flow
          </h1>

          <h2 className="py-3 text-xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Login Error */}
        {loginError && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {loginError}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:ring-4 focus:ring-indigo-500/10 ${errors.email
                ? "border-red-500"
                : "border-slate-300 focus:border-indigo-500"
                }`}
            />

            {errors.email && (
              <p className="text-xs font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full rounded-lg border bg-white px-4 py-2.5 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:ring-4 focus:ring-indigo-500/10 ${errors.password
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
                  }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs font-medium text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="remember"
              className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            >
              <input
                id="remember"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              Remember me
            </label>

            <a
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Contact Admin */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <a
            href="/contact-admin"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Contact Admin
          </a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  isLoggedInUser,
  useGetAllUsersQuery,
} from "../store/slices/requestSlice";
import Link from "next/link";

// --------------------------------------------------
// Types
// --------------------------------------------------

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Manager";
  department: string;
  status: "Active" | "Inactive";
};

type UsersResponse = {
  success: boolean;
  users: User[];
};

// --------------------------------------------------
// Validation
// --------------------------------------------------

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),

  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

// --------------------------------------------------
// Component
// --------------------------------------------------

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Get users from API
  const { data, isLoading: isUsersLoading, isError } = useGetAllUsersQuery(undefined);

  const { register, handleSubmit, formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // --------------------------------------------------
  // Login
  // --------------------------------------------------

  const onSubmit = async (formData: LoginFormData) => {
    setLoginError("");

    try {
      setIsLoginLoading(true);

      // ----------------------------------------------
      // API loading check
      // ----------------------------------------------

      if (isUsersLoading) {
        setLoginError("Please wait while users are loading.");
        return;
      }

      // ----------------------------------------------
      // API error check
      // ----------------------------------------------

      if (isError || !data?.success) {
        setLoginError("Unable to load users. Please try again later.");
        return;
      }

      // ----------------------------------------------
      // Find user
      // ----------------------------------------------

      const users = data.users || [];

      const user = users.find((item: any) => {
        return item.email.toLowerCase().trim() === formData.email.toLowerCase().trim()
      });

      // ----------------------------------------------
      // User not found
      // ----------------------------------------------

      if (!user) {
        setLoginError("Invalid email or password.");
        return;
      }

      // ----------------------------------------------
      // Demo password validation
      // ----------------------------------------------
      // IMPORTANT:
      // Password should normally be checked by backend.
      // This is only for your current demo API.

      const DEMO_PASSWORD = "123456";

      if (formData.password !== DEMO_PASSWORD) {
        setLoginError("Invalid email or password.");
        return;
      }

      // ----------------------------------------------
      // Check account status
      // ----------------------------------------------

      if (user.status !== "Active") {
        setLoginError(
          "Your account is inactive. Please contact admin."
        );
        return;
      }

      // ----------------------------------------------
      // Login successful
      // ----------------------------------------------

      console.log("Login successful:", user);

      // Redux login state
      dispatch(isLoggedInUser(true));

      // ----------------------------------------------
      // Save logged-in user
      // ----------------------------------------------

      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // ----------------------------------------------
      // Remember me
      // ----------------------------------------------

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      // ----------------------------------------------
      // Redirect
      // ----------------------------------------------

      // Replace the login history entry so authenticated users are routed
      // away from the login page immediately.
      router.replace("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-600 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Operation-Flow
          </h1>

          <h2 className="py-3 text-xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* API Loading */}
        {isUsersLoading && (
          <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-600">
            Loading users...
          </div>
        )}

        {/* Login Error */}
        {loginError && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {loginError}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
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
              htmlFor="rememberMe"
              className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            >
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>

            <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              isLoginLoading ||
              isUsersLoading
            }
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoginLoading ? (
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
        {/* <div className="rounded-lg p-4">
          <Link
            href="/addUser"
            className="block text-right text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Create Account
          </Link>
        </div> */}

        {/* Demo Credentials */}
        <div className="mt-1 rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-700">
            Demo credentials
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Email: raj@example.com
          </p>

          <p className="text-xs text-slate-500">
            Password: 123456
          </p>
        </div>

        {/* Contact Admin */}
        <p className="mt-2 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/addUser"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Create Account
          </Link>

        </p>
      </div>
    </main >
  );
};

export default LoginPage;


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../lib/store/authStore";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Uncommented and fixed useMutation
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      const endpoint = isLogin ? "/login" : "/register";

      const response = await fetch(
        `http://localhost:5000/api/auth${endpoint}`,
        {
          // Added full URL
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Authentication failed");
      }
      return response.json();
    },
    onSuccess: (data) => {
      useAuthStore.getState().login(data.token, data.email);
      console.log("data", data);
      window.location.href = "/dashboard"; // Force refresh auth state
    },
    onError: (error) => {
      alert(error.message);
      console.error("Auth Error:", error);
      // Consider adding error state for UI display
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      {/* Reg\login buttons */}
      <div className="flex gap-4 mb-8 border-b justify-center">
        {/* Register */}
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`pb-2 px-4 ${
            !isLogin ? "border-b-2 border-purple-600" : ""
          }`}
        >
          Register
        </button>
        {/* Login */}
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`pb-2 px-4 ${
            isLogin ? "border-b-2 border-purple-600" : ""
          }`}
        >
          Login
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <form onSubmit={handleSubmit((data) => registerUser(data))}>
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

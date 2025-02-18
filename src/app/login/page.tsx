// src/app/auth/login/page.tsx (or wherever your login page is)

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";


// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript type for form data
type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  // Your onSubmit function with login logic
//   const onSubmit = async (data: LoginData) => {
//     try {
//       const response = await axios.post("/api/auth/login", data);
//       console.log(response.data);
//       if (response.data.token) {
//         // Store the JWT token in localStorage or cookies
//         localStorage.setItem("authToken", response.data.token);

//         // Redirect to dashboard on successful login
//         router.push("/dashboard");
//       } else {
//         console.error("Login failed: No token returned.");
//       }
//     } catch (error) {
//       console.error("Login failed:", error.response?.data || error.message);

//       // Handle specific error cases
//       if (error.response?.status === 401) {
//         // Invalid credentials
//         alert("Invalid credentials. Please try again.");
//       } else {
//         // Other errors
//         alert("An error occurred. Please try again later.");
//       }
//     }
//   };

const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      console.log(response.data);
  
      if (response.data.token) {
        // Store the JWT token in localStorage or cookies
        localStorage.setItem("authToken", response.data.token);
  
        // Redirect to dashboard on successful login
        router.push("/dashboard");
      } else {
        console.error("Login failed: No token returned.");
      }
    } catch (error) {
      // Type assertion to AxiosError
      const err = error as AxiosError;
  
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Login failed:", err.response.data || err.message);
  
        // Handle specific error cases
        if (err.response.status === 401) {
          alert("Invalid credentials. Please try again.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response received:", err.request);
        alert("No response from server. Please check your network.");
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up request:", err.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="border p-2 w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

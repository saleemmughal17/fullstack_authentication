"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../context/AuthContext";

// Define the schema using Zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginData = z.infer<typeof loginSchema>;

// Create a function to handle the login API request
const loginRequest = async (data: LoginData) => {
  const response = await axios.post("/api/auth/login", data);
  
  return response.data;
};

// const loginRequest = async (data: LoginData) => {
  //   const response = await axios.post(`${window.location.origin}/api/auth/login`, data);
  //   return response.data;
  // };
  
  export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
    const {login}= useUser()
  const router = useRouter();

  // Use the useMutation hook from TanStack Query
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      console.log('login data........',data)
      login(data.user)
      // Save user name and role in localStorage
      if (data?.user.role == "Admin") {
        console.log('asfdgf');
        
        router.push("/admin");
      } else if(data?.user.role == "USER"){
        router.push("/DashboardUser");
      }
      const userData = {
        name: data.name || "User",
        role: data.role,

      };
      // localStorage.setItem("User", JSON.stringify(userData));

      // // Redirect based on role
      // if (data.role === "Admin") {
      //   router.push("/admin");
      // } else {
      //   router.push("/DashboardUser");
      // }
    },
    onError: (err) => {
      alert("Login failed. Please check credentials.");
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await mutateAsync(data); // Use the mutateAsync method to trigger the login request
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md mt-20">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email")}
          className="border p-2 w-full"
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password")}
          className="border p-2 w-full"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={isPending} // Disable button while loading
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </div>
  );
}

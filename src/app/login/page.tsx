"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      
      // Redirect based on role
      if (response.data.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/DashboardUser");
      }
    } catch (error) {
      alert("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} className="border p-2 w-full" placeholder="Email" />
        <input type="password" {...register("password")} className="border p-2 w-full" placeholder="Password" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    // Decode token manually or verify it on API
    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.role !== "ADMIN") {
      router.push("/dashboard");
    } else {
      setRole("ADMIN");
    }
  }, []);

  if (!role) return <p>Loading...</p>;

  return <h1>Welcome, Admin!</h1>;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import AdminPanel from "./AdminPanel";
import ManagerPanel from "./ManagerPanel";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch(
          "https://project-manager-api-blush.vercel.app/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // Token is invalid or expired
          localStorage.removeItem("authToken");
          localStorage.removeItem("userEmail");
          router.push("/");
          return;
        }

        const userData = await response.json();
        setUser(userData.user);
        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        router.push("/");
      }
    };

    verifyAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-highlight-blue text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      {user && user.role === "admin" ? (
        <AdminPanel />
      ) : user && user.role === "manager" ? (
        <ManagerPanel />
      ) : (
        <></>
      )}
    </>
  );
}

"use client";

import { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ open, setOpen }: NavbarProps) {
  const [registration, setRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      const storedEmail = localStorage.getItem("userEmail");
      if (token && storedEmail) {
        setIsLoggedIn(true);
        setUserEmail(storedEmail);
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    };

    // Check initial status
    checkAuthStatus();

    // Listen for storage changes (when auth token is removed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken" || e.key === "userEmail") {
        checkAuthStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (registration) {
      if (password && password !== confirmPassword) {
        setPasswordError(true);
      }
      if (password && password === confirmPassword) {
        setPasswordError(false);
      }
    }
  }, [password, confirmPassword, registration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (registration && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (registration && password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = registration
        ? "https://project-manager-api-blush.vercel.app/auth/signup"
        : "https://project-manager-api-blush.vercel.app/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `${registration ? "Registration" : "Login"} failed`
        );
      }

      if (registration) {
        setSuccess("Registration successful! You can now sign in.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRegistration(false);
      } else {
        setSuccess("Login successful! Welcome back.");
      }

      // Store authentication data
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", email);
        setIsLoggedIn(true);
        setUserEmail(email);
        resetForm();
        setOpen(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `An error occurred during ${
              registration ? "registration" : "login"
            }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError(false);
    setError("");
    setSuccess("");
  };

  return (
    <>
      <nav className="bg-background shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-extrabold tracking-tight text-highlight-blue select-none hover:cursor-pointer"
              >
                SuiteProp
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn && (
                <>
                  <span className="text-sm text-gray-400">
                    Welcome, {userEmail}
                  </span>
                  <Link
                    href="/dashboard"
                    className="text-default-font hover:text-highlight-blue px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-default-font hover:text-highlight-blue px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Sign Out
                </Button>
              ) : (
                <Dialog
                  open={open}
                  onOpenChange={(newOpen) => {
                    setOpen(newOpen);
                    if (!newOpen) {
                      resetForm();
                    }
                  }}
                >
                  <DialogTrigger className="text-default-font hover:text-highlight-blue px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                    Sign In
                  </DialogTrigger>
                  <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                      <DialogTitle>
                        {registration ? "Register" : "Sign In"}
                      </DialogTitle>
                      <DialogDescription>
                        {registration ? (
                          <>
                            Back to{" "}
                            <span
                              onClick={() => {
                                setRegistration(false);
                                resetForm();
                              }}
                              className="cursor-pointer text-highlight-blue hover:underline"
                            >
                              Sign In.
                            </span>
                          </>
                        ) : (
                          <>
                            New here?{" "}
                            <span
                              onClick={() => {
                                setRegistration(true);
                                resetForm();
                              }}
                              className="cursor-pointer text-highlight-blue hover:underline"
                            >
                              Register now.
                            </span>
                          </>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email-1">Email</Label>
                        <Input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          id="email-1"
                          type="email"
                          placeholder="someone@example.com"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password-1">Password</Label>
                        <Input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          id="password-1"
                          type="password"
                          placeholder="Your password"
                          disabled={isLoading}
                        />
                      </div>
                      {registration ? (
                        <>
                          <div className="grid gap-2">
                            <Label htmlFor="password-2">Confirm Password</Label>
                            <Input
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              value={confirmPassword}
                              id="password-2"
                              type="password"
                              placeholder="Confirm your password"
                              disabled={isLoading}
                            />
                          </div>
                          <div>
                            {passwordError ? (
                              <>
                                <Label className="text-error">
                                  Your passwords do not match.
                                </Label>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                      )}

                      {success && (
                        <div className="text-green-500 text-sm">{success}</div>
                      )}

                      <Button
                        type="submit"
                        disabled={
                          isLoading ||
                          (registration && passwordError) ||
                          !email ||
                          !password ||
                          (registration && !confirmPassword)
                        }
                        className="w-full"
                      >
                        {isLoading
                          ? registration
                            ? "Creating account..."
                            : "Signing in..."
                          : registration
                          ? "Create Account"
                          : "Sign In"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

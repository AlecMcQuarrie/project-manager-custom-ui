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

interface NavbarProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({open, setOpen}: NavbarProps) {
  const [registration, setRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const response = await fetch("https://project-manager-api-blush.vercel.app/auth/signup", {
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
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registration successful! You can now sign in.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRegistration(false);
      
      // Close dialog after 2 seconds
      setTimeout(() => {
        setOpen(false);
        setSuccess("");
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
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
              <span className="text-2xl font-extrabold tracking-tight text-highlight-blue select-none">
                SuiteProp
              </span>
            </div>
            <div className="flex space-x-4">
              <Dialog open={open} onOpenChange={(newOpen) => {
                setOpen(newOpen);
                if (!newOpen) {
                  resetForm();
                }
              }}>
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                      <div className="text-red-500 text-sm">
                        {error}
                      </div>
                    )}
                    
                    {success && (
                      <div className="text-green-500 text-sm">
                        {success}
                      </div>
                    )}

                    {registration && (
                      <Button 
                        type="submit" 
                        disabled={isLoading || passwordError || !email || !password || !confirmPassword}
                        className="w-full"
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

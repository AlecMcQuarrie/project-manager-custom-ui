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

  useEffect(() => {
    if (registration) {
      if (password && password !== confirmPassword) {
        setPasswordError(true);
      }
      if (password && password === confirmPassword) {
        setPasswordError(false);
      }
    }
    console.log(email);
  }, [password, confirmPassword, email]);

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
              <Dialog open={open} onOpenChange={setOpen}>
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
                            onClick={() => setRegistration(false)}
                            className="cursor-pointer text-highlight-blue hover:underline"
                          >
                            Sign In.
                          </span>
                        </>
                      ) : (
                        <>
                          New here?{" "}
                          <span
                            onClick={() => setRegistration(true)}
                            className="cursor-pointer text-highlight-blue hover:underline"
                          >
                            Register now.
                          </span>
                        </>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email-1">Email</Label>
                      <Input
                        onChange={(e) => setEmail(e.target.value)}
                        id="email-1"
                        type="email"
                        placeholder="someone@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password-1">Password</Label>
                      <Input
                        onChange={(e) => setPassword(e.target.value)}
                        id="password-1"
                        type="password"
                        placeholder="Your password"
                      />
                    </div>
                    {registration ? (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="password-2">Confirm Password</Label>
                          <Input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="password-2"
                            type="password"
                            placeholder="Confirm your password"
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
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

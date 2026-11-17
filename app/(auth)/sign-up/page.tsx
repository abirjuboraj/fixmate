"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Wrench,
  Check,
  X,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "technician">("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Assignment password validation requirements:
  // - at least 6 characters
  // - at least one uppercase letter
  // - at least one lowercase letter
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  const handleRoleChange = (selectedRole: "customer" | "technician") => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements below.");
      return;
    }

    // Role check: Only customer or technician allowed
    const finalRole: "customer" | "technician" =
      role === "technician" ? "technician" : "customer";

    setIsLoading(true);

    try {
      // Form payload ready for Better Auth sign-up functionality
      const signUpPayload = {
        name: name.trim(),
        email: email.trim(),
        password,
        role: finalRole,
      };

      console.log("Sign Up form submitted with payload:", signUpPayload);

      // TODO: Connect Better Auth signUp handler here:
      // await authClient.signUp.email({
      //   name: signUpPayload.name,
      //   email: signUpPayload.email,
      //   password: signUpPayload.password,
      //   role: signUpPayload.role,
      // });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Sign up failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-border/80">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create an Account
        </CardTitle>
        <CardDescription className="text-sm">
          Join FixMate to book repair services or list technician offerings.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs font-medium text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Role Selection: Customer or Technician (cards) */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Your Role
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {/* Customer Option */}
              <button
                type="button"
                onClick={() => handleRoleChange("customer")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                  role === "customer"
                    ? "border-primary bg-primary/5 text-primary shadow-xs"
                    : "border-border/80 hover:border-border hover:bg-muted/40 text-muted-foreground"
                }`}
              >
                <UserCheck
                  className={`h-5 w-5 mb-1.5 ${
                    role === "customer" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-semibold text-foreground">
                  Customer
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                  Book repairs & track jobs
                </span>
              </button>

              {/* Technician Option */}
              <button
                type="button"
                onClick={() => handleRoleChange("technician")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                  role === "technician"
                    ? "border-amber-500 bg-amber-500/5 text-amber-600 shadow-xs"
                    : "border-border/80 hover:border-border hover:bg-muted/40 text-muted-foreground"
                }`}
              >
                <Wrench
                  className={`h-5 w-5 mb-1.5 ${
                    role === "technician"
                      ? "text-amber-500"
                      : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-semibold text-foreground">
                  Technician
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                  List services & fix devices
                </span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Abir Hossen"
              value={name}
              onChange={handleNameChange}
              required
              autoComplete="name"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="pl-9"
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="pl-9 pr-9"
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Password Validation Requirements Display */}
            {password.length > 0 && (
              <div className="space-y-1 pt-1.5 text-xs">
                <div
                  className={`flex items-center gap-1.5 ${
                    hasMinLength ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                  }`}
                >
                  {hasMinLength ? (
                    <Check className="h-3 w-3 shrink-0" />
                  ) : (
                    <X className="h-3 w-3 shrink-0 text-destructive" />
                  )}
                  <span>At least 6 characters</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    hasUppercase ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                  }`}
                >
                  {hasUppercase ? (
                    <Check className="h-3 w-3 shrink-0" />
                  ) : (
                    <X className="h-3 w-3 shrink-0 text-destructive" />
                  )}
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    hasLowercase ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                  }`}
                >
                  {hasLowercase ? (
                    <Check className="h-3 w-3 shrink-0" />
                  ) : (
                    <X className="h-3 w-3 shrink-0 text-destructive" />
                  )}
                  <span>At least one lowercase letter (a-z)</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Button
            type="submit"
            className="w-full gap-2 shadow-sm font-semibold"
            disabled={isLoading || (password.length > 0 && !isPasswordValid)}
          >
            {isLoading ? (
              "Creating account..."
            ) : (
              <>
                Sign Up as {role === "customer" ? "Customer" : "Technician"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

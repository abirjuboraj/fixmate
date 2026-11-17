"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldAlert,
    Loader2,
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
import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) setError(null);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setIsLoading(true);

        try {

            const signInPayload = {
                email: email.trim(),
                password,
            };

            console.log("Sign In form submitted with payload:", signInPayload);

            const { error } = await signIn.email({
                email: signInPayload.email,
                password: signInPayload.password,
                rememberMe: true,
                callbackURL: "/"
            })

            if (error) {
                console.log(error);
            }

            toast.add({
                title: "Welcome Back!",
                description: "Successfully signed In.",
                type: "success",
            })


        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }

            toast.add({
                title: "Sign In Failed!",
                description: "Please check your credentials and try again.",
                type: "error",
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full shadow-lg border-border/80">
            <CardHeader className="space-y-1 text-center pb-6">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-sm">
                    Enter your FixMate credentials to access your dashboard.
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-9 pr-9"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                autoComplete="current-password"
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
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-2">
                    <Button
                        type="submit"
                        className="w-full gap-2 shadow-sm font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-semibold text-primary hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}

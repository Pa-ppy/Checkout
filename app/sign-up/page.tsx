"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, CheckCircle, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you would call your registration API here
      // For demo purposes, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful registration
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          name: name,
          email: email,
          image: "/placeholder.svg?height=100&width=100",
        })
      );

      toast({
        title: "Welcome to Checkout!",
        description: "Your account has been created successfully.",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "We couldn't create your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up details for user
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <div className="mx-auto grid w-full max-w-md gap-6 rounded-xl border border-purple-100 dark:border-purple-900/50 bg-white/80 dark:bg-slate-900/80 p-8 shadow-xl shadow-purple-500/10 backdrop-blur-sm">
        <div className="flex flex-col gap-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-2 shadow-lg shadow-purple-500/20">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Join Checkout
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create an account to start your productivity journey
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-slate-700 dark:text-slate-300"
            >
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="text-slate-700 dark:text-slate-300"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="text-slate-700 dark:text-slate-300"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-purple-600 dark:text-slate-500 dark:hover:text-purple-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="confirm-password"
              className="text-slate-700 dark:text-slate-300"
            >
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline-offset-4 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

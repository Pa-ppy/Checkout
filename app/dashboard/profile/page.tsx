"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Camera, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name);
      setEmail(parsedUser.email);
    }
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          name,
          email,
        };

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        toast({
          title: "Profile updated!",
          description: "Your profile has been updated successfully.",
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll use a placeholder
      const updatedUser = {
        ...user,
        image: "/placeholder.svg?height=200&width=200",
      };

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({
        title: "Profile image updated!",
        description: "Your profile image has been updated successfully.",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // Customize profile area
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          Your Profile
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-400">
              Your Photo
            </CardTitle>
            <CardDescription>
              This will be displayed on your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse blur-md opacity-70"></div>
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="relative h-40 w-40 rounded-full object-cover border-4 border-white dark:border-slate-800"
              />
              <Label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
              >
                <Camera className="h-5 w-5" />
                <span className="sr-only">Upload image</span>
              </Label>
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <p className="text-center font-medium text-slate-800 dark:text-slate-200">
              {user.name}
            </p>
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              {user.email}
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-400">
              Personal Information
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="text-slate-700 dark:text-slate-300"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
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
                    Updating...
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </CardContent>
          <Separator className="bg-purple-100 dark:bg-purple-900/50" />
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-400">
              Change Password
            </CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="current-password"
                  className="text-slate-700 dark:text-slate-300"
                >
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="new-password"
                  className="text-slate-700 dark:text-slate-300"
                >
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="confirm-password"
                  className="text-slate-700 dark:text-slate-300"
                >
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
              >
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-400">
            Account Settings
          </CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Email Notifications
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receive email notifications for task updates
              </p>
            </div>
            <div>
              <Input
                type="checkbox"
                className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                defaultChecked
              />
            </div>
          </div>
          <Separator className="bg-purple-100 dark:bg-purple-900/50" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Add an extra layer of security to your account
              </p>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                Enable
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

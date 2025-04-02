"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  CheckSquare,
  CheckCircle,
  Home,
  LogOut,
  Menu,
  Sparkles,
  Trash,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  type Notification,
  NotificationList,
} from "@/components/notification-list";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/sign-in");
    }

    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Set some demo notifications
      const demoNotifications: Notification[] = [
        {
          id: "1",
          title: "Task completed",
          message: "You've completed 'Review team updates'",
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Welcome to Checkout",
          message: "Get started by creating your first task",
          read: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          title: "Reminder",
          message: "Task 'Complete project proposal' is due soon",
          read: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ];
      setNotifications(demoNotifications);
      localStorage.setItem("notifications", JSON.stringify(demoNotifications));
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    toast({
      title: "Signed out successfully",
      description: "We hope to see you again soon!",
    });

    router.push("/");
  };

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleClearAll = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && pathname?.startsWith(path)) {
      return true;
    }
    return false;
  };

  if (!isMounted) {
    return null;
  }

  // Skeleton layout for the dashboard page
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-purple-100 dark:border-purple-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 p-0"
          >
            <div className="flex h-16 items-center border-b border-purple-100 dark:border-purple-900/50 px-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                  Checkout
                </span>
              </Link>
            </div>
            <nav className="grid gap-2 p-4 text-lg font-medium">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  isActive("/dashboard")
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }`}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/tasks"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  isActive("/dashboard/tasks")
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }`}
              >
                <CheckSquare className="h-5 w-5" />
                Tasks
              </Link>
              <Link
                href="/dashboard/trash"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  isActive("/dashboard/trash")
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }`}
              >
                <Trash className="h-5 w-5" />
                Trash
              </Link>
              <Link
                href="/dashboard/profile"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  isActive("/dashboard/profile")
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }`}
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Checkout
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="relative border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>

            {showNotifications && (
              <NotificationList
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-purple-100 dark:border-purple-900/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive("/dashboard")
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-medium"
                  : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/tasks"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive("/dashboard/tasks")
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-medium"
                  : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              Tasks
            </Link>
            <Link
              href="/dashboard/trash"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive("/dashboard/trash")
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-medium"
                  : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              <Trash className="h-4 w-4" />
              Trash
            </Link>
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive("/dashboard/profile")
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-medium"
                  : "text-slate-700 hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

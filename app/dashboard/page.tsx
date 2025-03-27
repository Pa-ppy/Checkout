"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Plus, Sparkles, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskList } from "@/components/task-list";
import { TaskForm } from "@/components/task-form";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
  dueDate?: string;
  color?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get tasks from localStorage
    const tasksData = localStorage.getItem("tasks");
    if (tasksData) {
      setTasks(JSON.parse(tasksData));
    } else {
      // Set some demo tasks with colors
      const demoTasks: Task[] = [
        {
          id: "1",
          title: "Complete project proposal",
          description: "Finish the project proposal for the client meeting",
          status: "pending",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
          color: "purple",
        },
        {
          id: "2",
          title: "Review team updates",
          description: "Go through the weekly updates from the team",
          status: "completed",
          createdAt: new Date().toISOString(),
          color: "blue",
        },
        {
          id: "3",
          title: "Prepare presentation",
          description: "Create slides for the upcoming presentation",
          status: "pending",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
          color: "green",
        },
      ];
      setTasks(demoTasks);
      localStorage.setItem("tasks", JSON.stringify(demoTasks));
    }
  }, []);

  useEffect(() => {
    // Animate progress bar
    const pendingTasks = tasks.filter((task) => task.status === "pending");
    const completedTasks = tasks.filter((task) => task.status === "completed");
    const completionRate =
      tasks.length > 0
        ? Math.round((completedTasks.length / tasks.length) * 100)
        : 0;

    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress < completionRate) {
        currentProgress += 1;
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [tasks]);

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

  const handleTaskStatusChange = (
    taskId: string,
    status: "pending" | "completed"
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleTaskDelete = (taskId: string) => {
    // In a real app, you might move this to a "trash" collection
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Add to deleted tasks
    const deletedTask = tasks.find((task) => task.id === taskId);
    if (deletedTask) {
      const deletedTasks = JSON.parse(
        localStorage.getItem("deletedTasks") || "[]"
      );
      deletedTasks.push({
        ...deletedTask,
        deletedAt: new Date().toISOString(),
      });
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    }
  };

  const handleAddTask = (task: Omit<Task, "id" | "createdAt">) => {
    // Assign a random color if not provided
    const colors = ["purple", "blue", "green", "pink", "orange"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTask: Task = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      color: task.color || randomColor,
      ...task,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsFormOpen(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
          <p className="text-slate-600 dark:text-slate-400">
            Loading your tasks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Welcome, {user.name}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Let's make today productive
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {isFormOpen && (
        <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-700 dark:text-purple-400">
              Add New Task
            </CardTitle>
            <CardDescription>
              Create a new task to boost your productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setIsFormOpen(false)}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-700 dark:text-purple-400">
              Task Overview
            </CardTitle>
            <CardDescription>Your current task progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Pending: {pendingTasks.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Completed: {completedTasks.length}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Progress
                </span>
                <span className="font-medium text-purple-700 dark:text-purple-400">
                  {completionRate}%
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2 bg-purple-100 dark:bg-purple-900/30"
                indicatorClassName="bg-gradient-to-r from-purple-600 to-blue-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/tasks"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline"
            >
              View all tasks
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-600 dark:text-blue-400">
              Quick Stats
            </CardTitle>
            <CardDescription>Your task statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-purple-100 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/20 p-3 transition-transform hover:scale-105">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Tasks
                </div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {tasks.length}
                </div>
              </div>
              <div className="rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 p-3 transition-transform hover:scale-105">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Completion Rate
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {completionRate}%
                </div>
              </div>
              <div className="rounded-lg border border-orange-100 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 p-3 transition-transform hover:scale-105">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Pending
                </div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {pendingTasks.length}
                </div>
              </div>
              <div className="rounded-lg border border-green-100 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 p-3 transition-transform hover:scale-105">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Completed
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {completedTasks.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-purple-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-green-600 dark:text-green-400">
              Profile Summary
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse blur-md opacity-70"></div>
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  className="relative h-16 w-16 rounded-full object-cover border-2 border-white dark:border-slate-800"
                />
              </div>
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-200">
                  {user.name}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {user.email}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/profile"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline"
            >
              Edit profile
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-purple-700 dark:text-purple-400">
            <div className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
              Your Tasks
            </div>
          </CardTitle>
          <CardDescription>
            Manage your tasks and boost productivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="mt-2">
            <TabsList className="bg-purple-100 dark:bg-purple-900/30 p-1">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm"
              >
                Pending Tasks
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm"
              >
                Completed Tasks
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <TaskList
                tasks={pendingTasks}
                onStatusChange={handleTaskStatusChange}
                onDelete={handleTaskDelete}
              />
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <TaskList
                tasks={completedTasks}
                onStatusChange={handleTaskStatusChange}
                onDelete={handleTaskDelete}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

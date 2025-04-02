import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ListTodo,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Header inclusion and page structure for landing
export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-purple-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <Link className="flex items-center justify-center" href="/">
          <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <span className="ml-2 font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Checkout
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container mx-auto grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 dark:border-purple-800 dark:bg-purple-900/30 px-3 py-1 text-sm">
                <span className="text-purple-800 dark:text-purple-300">
                  Task management simplified
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
                  Transform Your Productivity
                </h1>
                <p className="max-w-[600px] text-slate-700 dark:text-slate-300 md:text-xl">
                  Checkout helps you organize tasks with clarity and focus.
                  Create, track, and complete tasks in a delightful experience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 gap-1.5"
                  >
                    Start Your Journey
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative mx-auto aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 p-2 shadow-2xl shadow-purple-500/10 border border-white/20 lg:order-last">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
              <div className="relative h-full w-full rounded-lg bg-white/90 dark:bg-slate-900/90 p-4 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-sm font-medium text-slate-600 dark:text-slate-400">
                    Checkout Dashboard
                  </div>
                </div>
                <div className="flex-1 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                    <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
                      Complete project proposal
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Plan weekly goals
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
                    <ListTodo className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">
                      Organize team meeting
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50 dark:from-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 dark:border-purple-800 dark:bg-purple-900/30 px-3 py-1 text-sm">
                  <span className="text-purple-800 dark:text-purple-300">
                    Powerful features
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                  Designed for Productivity
                </h2>
                <p className="max-w-[900px] text-slate-700 dark:text-slate-300 md:text-xl">
                  Everything you need to stay organized and productive
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 p-6 shadow-lg shadow-purple-500/5 transition-all hover:shadow-xl hover:-translate-y-1 hover:shadow-purple-500/10">
                <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-3 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">
                  Intuitive Task Management
                </h3>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Create, organize, and complete tasks with a delightful
                  interface designed for focus
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 p-6 shadow-lg shadow-purple-500/5 transition-all hover:shadow-xl hover:-translate-y-1 hover:shadow-purple-500/10">
                <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-3 text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">
                  Visual Motivation
                </h3>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Celebrate your progress with satisfying animations and visual
                  rewards
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 p-6 shadow-lg shadow-purple-500/5 transition-all hover:shadow-xl hover:-translate-y-1 hover:shadow-purple-500/10">
                <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-3 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">
                  Personalized Experience
                </h3>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Customize your profile and workspace to match your unique
                  style and preferences
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 dark:border-purple-800 dark:bg-purple-900/30 px-3 py-1 text-sm">
                  <span className="text-purple-800 dark:text-purple-300">
                    Get started
                  </span>
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                  Ready to transform your productivity?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 md:text-xl">
                  Join thousands of users who have already discovered the joy of
                  organized productivity.
                </p>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 gap-1.5"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © 2024 Checkout. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

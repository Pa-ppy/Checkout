"use client"

import { useEffect, useState } from "react"
import { Plus, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"

type Task = {
  id: string
  title: string
  description: string
  status: "pending" | "completed"
  createdAt: string
  dueDate?: string
  color?: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Get tasks from localStorage
    const tasksData = localStorage.getItem("tasks")
    if (tasksData) {
      setTasks(JSON.parse(tasksData))
    }
  }, [])

  const pendingTasks = tasks
    .filter((task) => task.status === "pending")
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const completedTasks = tasks
    .filter((task) => task.status === "completed")
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleTaskStatusChange = (taskId: string, status: "pending" | "completed") => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const handleTaskDelete = (taskId: string) => {
    // In a real app, you might move this to a "trash" collection
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

    // Add to deleted tasks
    const deletedTask = tasks.find((task) => task.id === taskId)
    if (deletedTask) {
      const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks") || "[]")
      deletedTasks.push({
        ...deletedTask,
        deletedAt: new Date().toISOString(),
      })
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))
    }
  }

  const handleAddTask = (task: Omit<Task, "id" | "createdAt">) => {
    // Assign a random color if not provided
    const colors = ["purple", "blue", "green", "pink", "orange"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newTask: Task = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      color: task.color || randomColor,
      ...task,
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setIsFormOpen(false)
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          Your Tasks
        </h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {isFormOpen && (
        <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-400">Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm onSubmit={handleAddTask} onCancel={() => setIsFormOpen(false)} />
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-purple-500 dark:text-purple-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
        <CardContent className="pt-6">
          <Tabs defaultValue="pending">
            <TabsList className="bg-purple-100 dark:bg-purple-900/30 p-1">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm"
              >
                Pending ({pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm"
              >
                Completed ({completedTasks.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              {pendingTasks.length === 0 && searchQuery === "" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Sparkles className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">No pending tasks</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
                    You don't have any pending tasks. Click the "Add Task" button to create a new task.
                  </p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Task
                  </Button>
                </div>
              ) : pendingTasks.length === 0 && searchQuery !== "" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">No matching tasks</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    No pending tasks match your search for "{searchQuery}".
                  </p>
                </div>
              ) : (
                <TaskList tasks={pendingTasks} onStatusChange={handleTaskStatusChange} onDelete={handleTaskDelete} />
              )}
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              {completedTasks.length === 0 && searchQuery === "" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">No completed tasks</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    You haven't completed any tasks yet. Complete a task to see it here.
                  </p>
                </div>
              ) : completedTasks.length === 0 && searchQuery !== "" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">No matching tasks</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    No completed tasks match your search for "{searchQuery}".
                  </p>
                </div>
              ) : (
                <TaskList tasks={completedTasks} onStatusChange={handleTaskStatusChange} onDelete={handleTaskDelete} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


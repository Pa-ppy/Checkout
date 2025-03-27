"use client"

import { Check, MoreHorizontal, Trash, Undo } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Task = {
  id: string
  title: string
  description: string
  status: "pending" | "completed"
  createdAt: string
  dueDate?: string
  color?: string
}

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (taskId: string, status: "pending" | "completed") => void
  onDelete: (taskId: string) => void
}

export function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">No tasks found</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {tasks.some((task) => task.status === "completed")
            ? "You haven't completed any tasks yet"
            : "Create a new task to get started"}
        </p>
      </div>
    )
  }

  // Function to get color classes based on task color
  const getColorClasses = (color = "purple", isCompleted: boolean) => {
    const colorMap: Record<
      string,
      { bg: string; border: string; hoverBg: string; darkBg: string; darkBorder: string; darkHoverBg: string }
    > = {
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-100",
        hoverBg: "hover:bg-purple-100",
        darkBg: "dark:bg-purple-900/10",
        darkBorder: "dark:border-purple-900/30",
        darkHoverBg: "dark:hover:bg-purple-900/20",
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-100",
        hoverBg: "hover:bg-blue-100",
        darkBg: "dark:bg-blue-900/10",
        darkBorder: "dark:border-blue-900/30",
        darkHoverBg: "dark:hover:bg-blue-900/20",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-100",
        hoverBg: "hover:bg-green-100",
        darkBg: "dark:bg-green-900/10",
        darkBorder: "dark:border-green-900/30",
        darkHoverBg: "dark:hover:bg-green-900/20",
      },
      pink: {
        bg: "bg-pink-50",
        border: "border-pink-100",
        hoverBg: "hover:bg-pink-100",
        darkBg: "dark:bg-pink-900/10",
        darkBorder: "dark:border-pink-900/30",
        darkHoverBg: "dark:hover:bg-pink-900/20",
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-100",
        hoverBg: "hover:bg-orange-100",
        darkBg: "dark:bg-orange-900/10",
        darkBorder: "dark:border-orange-900/30",
        darkHoverBg: "dark:hover:bg-orange-900/20",
      },
    }

    const colorClasses = colorMap[color] || colorMap.purple

    if (isCompleted) {
      return `bg-slate-50 border-slate-100 dark:bg-slate-900/10 dark:border-slate-800/30`
    }

    return `${colorClasses.bg} ${colorClasses.border} ${colorClasses.hoverBg} ${colorClasses.darkBg} ${colorClasses.darkBorder} ${colorClasses.darkHoverBg}`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => {
        const isCompleted = task.status === "completed"
        const colorClasses = getColorClasses(task.color, isCompleted)

        return (
          <Card
            key={task.id}
            className={`border ${colorClasses} shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 group overflow-hidden`}
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 ${!isCompleted ? "bg-gradient-to-r from-purple-600 to-blue-500" : "bg-slate-200 dark:bg-slate-700"}`}
            ></div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle
                  className={
                    isCompleted
                      ? "line-through text-slate-500 dark:text-slate-500"
                      : "text-slate-800 dark:text-slate-200"
                  }
                >
                  {task.title}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-2 text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900"
                  >
                    {task.status === "pending" ? (
                      <DropdownMenuItem
                        onClick={() => onStatusChange(task.id, "completed")}
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 cursor-pointer"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as completed
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => onStatusChange(task.id, "pending")}
                        className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 cursor-pointer"
                      >
                        <Undo className="mr-2 h-4 w-4" />
                        Mark as pending
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onDelete(task.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription
                className={
                  isCompleted ? "line-through text-slate-400 dark:text-slate-600" : "text-slate-600 dark:text-slate-400"
                }
              >
                {task.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {task.dueDate && (
                <div
                  className={`text-sm ${isCompleted ? "text-slate-400 dark:text-slate-600" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-full border-purple-200 dark:border-purple-800 ${
                    isCompleted
                      ? "text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                      : "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                  } transition-all duration-200`}
                  onClick={() =>
                    task.status === "pending"
                      ? onStatusChange(task.id, "completed")
                      : onStatusChange(task.id, "pending")
                  }
                >
                  {task.status === "pending" ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Complete
                    </>
                  ) : (
                    <>
                      <Undo className="mr-2 h-4 w-4" />
                      Undo
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-200 dark:border-purple-800 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

type Task = {
  title: string
  description: string
  status: "pending" | "completed"
  dueDate?: string
  color?: string
}

interface TaskFormProps {
  onSubmit: (task: Task) => void
  onCancel: () => void
  initialData?: Task
}

export function TaskForm({ onSubmit, onCancel, initialData }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [dueDate, setDueDate] = useState<Date | undefined>(
    initialData?.dueDate ? new Date(initialData.dueDate) : undefined,
  )
  const [color, setColor] = useState(initialData?.color || "purple")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title,
      description,
      status: initialData?.status || "pending",
      dueDate: dueDate?.toISOString(),
      color,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="title" className="text-slate-700 dark:text-slate-300">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description" className="text-slate-700 dark:text-slate-300">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="rounded-lg border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="due-date" className="text-slate-700 dark:text-slate-300">
          Due Date (Optional)
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="due-date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-purple-100 dark:border-purple-900/50 focus:border-purple-300 focus:ring focus:ring-purple-500/20 dark:bg-slate-800 dark:text-slate-300",
                !dueDate && "text-slate-500 dark:text-slate-400",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400" />
              {dueDate ? format(dueDate, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
              className="bg-white dark:bg-slate-900"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <Label className="text-slate-700 dark:text-slate-300">Task Color</Label>
        <RadioGroup defaultValue={color} onValueChange={setColor} className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="purple"
              id="color-purple"
              className="border-purple-300 text-purple-600 focus:ring-purple-500"
            />
            <Label htmlFor="color-purple" className="flex items-center cursor-pointer">
              <span className="h-4 w-4 rounded-full bg-purple-500 mr-1.5"></span>
              Purple
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="blue"
              id="color-blue"
              className="border-blue-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="color-blue" className="flex items-center cursor-pointer">
              <span className="h-4 w-4 rounded-full bg-blue-500 mr-1.5"></span>
              Blue
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="green"
              id="color-green"
              className="border-green-300 text-green-600 focus:ring-green-500"
            />
            <Label htmlFor="color-green" className="flex items-center cursor-pointer">
              <span className="h-4 w-4 rounded-full bg-green-500 mr-1.5"></span>
              Green
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="pink"
              id="color-pink"
              className="border-pink-300 text-pink-600 focus:ring-pink-500"
            />
            <Label htmlFor="color-pink" className="flex items-center cursor-pointer">
              <span className="h-4 w-4 rounded-full bg-pink-500 mr-1.5"></span>
              Pink
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="orange"
              id="color-orange"
              className="border-orange-300 text-orange-600 focus:ring-orange-500"
            />
            <Label htmlFor="color-orange" className="flex items-center cursor-pointer">
              <span className="h-4 w-4 rounded-full bg-orange-500 mr-1.5"></span>
              Orange
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
        >
          Save Task
        </Button>
      </div>
    </form>
  )
}


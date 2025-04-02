"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

type DeletedTask = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
  deletedAt: string;
  dueDate?: string;
  color?: string;
};

export default function TrashPage() {
  const [deletedTasks, setDeletedTasks] = useState<DeletedTask[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Get deleted tasks from localStorage
    const deletedTasksData = localStorage.getItem("deletedTasks");
    if (deletedTasksData) {
      setDeletedTasks(JSON.parse(deletedTasksData));
    }
  }, []);

  const filteredTasks = deletedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestoreTask = (taskId: string) => {
    // Find the task to restore
    const taskToRestore = deletedTasks.find((task) => task.id === taskId);
    if (!taskToRestore) return;

    // Remove from deleted tasks
    const updatedDeletedTasks = deletedTasks.filter(
      (task) => task.id !== taskId
    );
    setDeletedTasks(updatedDeletedTasks);
    localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));

    // Add back to tasks
    const { deletedAt, ...taskWithoutDeletedAt } = taskToRestore;
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(taskWithoutDeletedAt);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    toast({
      title: "Task restored!",
      description: "The task has been restored successfully.",
    });
  };

  const handlePermanentDelete = (taskId: string) => {
    // Remove an item from deleted tasks
    const updatedDeletedTasks = deletedTasks.filter(
      (task) => task.id !== taskId
    );
    setDeletedTasks(updatedDeletedTasks);
    localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));

    toast({
      title: "Task permanently deleted",
      description: "The task has been permanently deleted.",
    });
  };

  const handleEmptyTrash = () => {
    setDeletedTasks([]);
    localStorage.setItem("deletedTasks", JSON.stringify([]));

    toast({
      title: "Trash emptied",
      description: "All deleted tasks have been permanently removed.",
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          Trash
        </h1>
        <Button
          variant="destructive"
          onClick={handleEmptyTrash}
          disabled={deletedTasks.length === 0}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Empty Trash
        </Button>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-purple-500/5 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-400">
            Deleted Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Input
                placeholder="Search deleted tasks..."
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

          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Trash2 className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                No deleted tasks
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Tasks you delete will appear here
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-purple-100 dark:border-purple-900/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-purple-50 dark:bg-purple-900/20">
                  <TableRow className="hover:bg-transparent border-purple-100 dark:border-purple-900/50">
                    <TableHead className="text-purple-700 dark:text-purple-400 font-medium">
                      Title
                    </TableHead>
                    <TableHead className="text-purple-700 dark:text-purple-400 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-purple-700 dark:text-purple-400 font-medium">
                      Deleted On
                    </TableHead>
                    <TableHead className="text-purple-700 dark:text-purple-400 font-medium text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className="hover:bg-purple-50 dark:hover:bg-purple-900/10 border-purple-100 dark:border-purple-900/50"
                    >
                      <TableCell className="font-medium text-slate-800 dark:text-slate-200">
                        {task.title}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                          }`}
                        >
                          {task.status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {new Date(task.deletedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRestoreTask(task.id)}
                          title="Restore"
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Restore</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePermanentDelete(task.id)}
                          title="Delete Permanently"
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Permanently</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

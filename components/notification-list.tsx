"use client"
import { Check, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"

export type Notification = {
  id: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onClearAll: () => void
  onClose: () => void
}

export function NotificationList({ notifications, onMarkAsRead, onClearAll, onClose }: NotificationListProps) {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-purple-100 dark:border-purple-900/50 bg-white dark:bg-slate-900 shadow-lg shadow-purple-500/10 z-50">
      <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 p-3">
        <h3 className="font-medium text-slate-800 dark:text-slate-200">Notifications</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-8 px-2 text-xs text-slate-600 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-400"
          >
            Clear all
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 text-slate-600 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-400"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      <div className="max-h-[320px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">No notifications</p>
          </div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`border-b border-purple-100 dark:border-purple-900/50 last:border-0 ${
                  notification.read ? "bg-white dark:bg-slate-900" : "bg-purple-50 dark:bg-purple-900/10"
                }`}
              >
                <div className="flex p-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{notification.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{notification.message}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMarkAsRead(notification.id)}
                      className="h-6 w-6 ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 self-start"
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}


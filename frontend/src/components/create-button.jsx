"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function CreateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Base styles
        "fixed right-4 bottom-24 h-14 w-14 rounded-full",
        "bg-brand-blue-start dark:bg-brand-blue-dark",
        "flex items-center justify-center",
        "shadow-lg shadow-blue-500/25 dark:shadow-blue-900/25",
        // Animation
        "transition-transform duration-200",
        "hover:scale-105 active:scale-95",
        // Z-index
        "z-50"
      )}
    >
      <Plus className="h-7 w-7 text-white" />
    </button>
  )
}
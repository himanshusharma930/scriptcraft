"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function CreateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Base styles
        "h-14 w-14 rounded-full",
        "bg-[#007AFF]",
        "flex items-center justify-center",
        "shadow-lg shadow-blue-500/25",
        // Position
        "absolute -top-6 left-1/2 -translate-x-1/2",
        // Animation
        "transition-transform duration-200",
        "hover:scale-105 active:scale-95",
        // Dark mode
        "dark:bg-brand-blue-dark dark:shadow-brand-blue-dark/25"
      )}
    >
      <Plus className="h-7 w-7 text-white" />
    </button>
  )
}
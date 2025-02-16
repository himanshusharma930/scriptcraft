"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function CreateButton({ onClick }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      className={cn(
        // Base styles
        `relative h-[58px] w-[58px] rounded-full
         bg-[#007AFF] select-none outline-none
         shadow-lg shadow-blue-500/25`,
        // Animation
        `transition-all duration-200`,
        // Active state
        isPressed && 'transform scale-[0.97] bg-[#0A84FF] shadow-md'
      )}
    >
      <Plus 
        className={cn(
          `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
           h-7 w-7 text-white transition-transform duration-200`,
          isPressed && 'scale-[0.97]'
        )}
      />
    </button>
  )
}
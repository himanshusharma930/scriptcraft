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
        `relative h-[56px] w-[56px] rounded-full
         bg-[#007AFF] select-none outline-none`,
        // Transition
        `transition-all duration-200 ease-out`,
        // Active state
        isPressed && 'transform scale-[0.97] bg-[#0A84FF]'
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
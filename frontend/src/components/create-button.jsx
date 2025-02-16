"use client"

import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function CreateButton({ onClick }) {
  const [isPressed, setIsPressed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle animation cleanup
  useEffect(() => {
    if (isPressed) {
      setIsAnimating(true)
    }
    
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [isPressed])

  return (
    <button
      onClick={(e) => {
        setIsPressed(true)
        onClick?.(e)
        // Reset press state after animation
        setTimeout(() => setIsPressed(false), 200)
      }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      className={cn(
        // Base styles
        `relative group h-[56px] w-[56px] rounded-full
         bg-[#007AFF] select-none outline-none
         transform-gpu will-change-transform`,
        // Shadow states
        `shadow-lg shadow-blue-500/20`,
        // Animation classes
        `transition-all duration-200`,
        // Active/Pressed state
        isPressed && `
          scale-[0.96] 
          shadow-md 
          bg-[#0A84FF]
        `,
        // iOS spring animation
        isAnimating && `
          motion-safe:animate-ios-spring
        `
      )}
    >
      {/* Background blur effect */}
      <div 
        className={cn(
          `absolute inset-0 rounded-full bg-white/10 opacity-0
           transition-opacity duration-200`,
          isPressed && 'opacity-100'
        )}
      />

      {/* Icon */}
      <Plus 
        className={cn(
          `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
           h-7 w-7 text-white transition-transform duration-200`,
          isPressed && 'scale-[0.96]'
        )}
      />

      {/* Focus ring */}
      <div 
        className={`
          absolute -inset-3 rounded-full opacity-0
          transition-opacity duration-200
          focus-visible:ring-2 focus-visible:ring-[#007AFF]/50
          focus-visible:opacity-100
        `}
      />
    </button>
  )
}
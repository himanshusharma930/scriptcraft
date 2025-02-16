"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

export function CreateButton({ onClick }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        relative h-14 w-14 rounded-full shadow-lg
        bg-primary hover:bg-primary/90
        transition-all duration-200 ease-spring
        ${isPressed ? 'scale-90' : 'scale-100'}
        active:scale-90
        before:absolute before:inset-0
        before:rounded-full before:bg-white/10
        before:opacity-0 before:transition-opacity
        hover:before:opacity-100
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary focus-visible:ring-offset-2
      `}
    >
      <Plus 
        className={`
          h-6 w-6 text-white absolute
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          transition-transform duration-200
          ${isPressed ? 'scale-90' : 'scale-100'}
        `}
      />
    </button>
  )
}
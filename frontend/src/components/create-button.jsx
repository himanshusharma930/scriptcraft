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
        relative h-14 w-14 rounded-full
        bg-[#007AFF] hover:bg-[#0A84FF]
        shadow-lg
        transition-all duration-200
        ${isPressed ? 'scale-95' : 'scale-100'}
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#007AFF] focus-visible:ring-offset-2
      `}
    >
      <Plus 
        className={`
          h-7 w-7 text-white absolute
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          transition-transform duration-200
          ${isPressed ? 'scale-90' : 'scale-100'}
        `}
      />
    </button>
  )
}
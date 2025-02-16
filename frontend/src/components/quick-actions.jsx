"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Lightbulb, 
  Video, 
  Wand2,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

const QUICK_ACTIONS = [
  {
    icon: Lightbulb,
    label: "Content Ideas",
    gradient: "from-orange-400 to-pink-500"
  },
  {
    icon: Video,
    label: "Script Writing",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: Wand2,
    label: "Optimization",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: Target,
    label: "Audience",
    gradient: "from-purple-400 to-violet-500"
  }
]

export function QuickActions({ onSelect }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  return (
    <div className="relative">
      {/* Scroll Indicators */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 
                        bg-gradient-to-r from-[hsl(var(--ios-system-background))] 
                        to-transparent z-10 pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 
                        bg-gradient-to-l from-[hsl(var(--ios-system-background))] 
                        to-transparent z-10 pointer-events-none" />
      )}
      
      {/* Actions Container */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto hide-scrollbar px-4 py-3"
      >
        <div className="flex gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.label}
              onClick={() => onSelect?.(action.label)}
              className={cn(
                "flex-none h-11 px-4 rounded-full",
                "bg-gradient-to-r",
                action.gradient,
                "text-white font-medium",
                "shadow-sm",
                "hover:opacity-90 active:scale-95",
                "transition-all duration-200"
              )}
            >
              <action.icon className="h-4 w-4 mr-2" />
              <span className="text-sm whitespace-nowrap">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
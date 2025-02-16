"use client"

import { Button } from "@/components/ui/button"
import { 
  Lightbulb, 
  Video, 
  FileText, 
  Sparkles, 
  Palette, 
  BarChart, 
  Hash, 
  Wand2,
  MessageCircle,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

const QUICK_ACTIONS = [
  { icon: Lightbulb, label: "Content Ideas", color: "from-yellow-500 to-orange-500" },
  { icon: Video, label: "Script Writing", color: "from-blue-500 to-indigo-500" },
  { icon: MessageCircle, label: "Hook Writing", color: "from-green-500 to-emerald-500" },
  { icon: Palette, label: "Thumbnail Ideas", color: "from-purple-500 to-pink-500" },
  { icon: Hash, label: "Tags & SEO", color: "from-red-500 to-rose-500" },
  { icon: BarChart, label: "Analytics Tips", color: "from-cyan-500 to-blue-500" },
  { icon: Target, label: "Audience Growth", color: "from-violet-500 to-purple-500" },
  { icon: Wand2, label: "Optimization", color: "from-amber-500 to-yellow-500" }
]

export function QuickActions({ onActionSelect }) {
  return (
    <div className="relative">
      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 
                      bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 
                      bg-gradient-to-l from-black to-transparent z-10" />
      
      {/* Scrolling Container */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 px-4 py-3">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.label}
              onClick={() => onActionSelect(action.label)}
              className={cn(
                "flex-none h-10 px-4 rounded-full",
                "bg-gradient-to-r border-0",
                "hover:opacity-90 active:scale-95",
                "transition-all duration-200",
                action.color
              )}
            >
              <action.icon className="h-4 w-4 mr-2 text-white" />
              <span className="text-sm font-medium text-white whitespace-nowrap">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
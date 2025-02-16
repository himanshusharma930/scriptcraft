"use client"

import { Button } from "@/components/ui/button"
import { 
  Video, 
  Image, 
  FileText, 
  Sparkles, 
  Lightbulb, 
  Wand2,
  MessageCircle,
  Palette
} from "lucide-react"
import { cn } from "@/lib/utils"

const QUICK_ACTIONS = [
  { icon: Lightbulb, label: "Content Ideas" },
  { icon: Video, label: "Script Writing" },
  { icon: Image, label: "Thumbnail" },
  { icon: MessageCircle, label: "Hook Writing" },
  { icon: FileText, label: "Description" },
  { icon: Palette, label: "Branding" },
  { icon: Wand2, label: "SEO Tips" },
  { icon: Sparkles, label: "Engagement" }
]

export function QuickActions({ onActionSelect }) {
  return (
    <div className="relative">
      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r 
                      from-brand-light-bg to-transparent dark:from-brand-dark-bg z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l 
                      from-brand-light-bg to-transparent dark:from-brand-dark-bg z-10" />
      
      {/* Scrolling Container */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-4 py-2 min-w-min">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              onClick={() => onActionSelect(action.label)}
              className={cn(
                "flex-none h-10 px-4 rounded-full",
                "bg-white dark:bg-brand-dark-secondary",
                "border border-brand-light-border dark:border-brand-dark-border",
                "hover:bg-brand-gray-100 dark:hover:bg-brand-dark-secondary/80",
                "transition-all duration-200"
              )}
            >
              <action.icon className="h-4 w-4 mr-2 
                                    text-brand-blue-start dark:text-brand-blue-dark" />
              <span className="text-sm text-brand-light-text-primary 
                             dark:text-brand-dark-text-primary">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
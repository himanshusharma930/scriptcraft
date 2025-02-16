"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  {
    type: "Improvement",
    content: "Consider adding a hook in the introduction to grab viewer attention",
    icon: Sparkles
  },
  {
    type: "Grammar",
    content: "Review sentence structure in paragraph 2 for clarity",
    icon: Sparkles
  },
  {
    type: "Style",
    content: "Try using more active voice in the conclusion",
    icon: Sparkles
  }
]

export function AiSuggestions() {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {SUGGESTIONS.map((suggestion, index) => (
        <div
          key={index}
          className={cn(
            "p-4 rounded-2xl",
            "bg-white dark:bg-brand-dark-secondary",
            "border border-brand-light-border dark:border-brand-dark-border"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full 
                           bg-brand-blue-start/10 dark:bg-brand-blue-dark/10 
                           flex items-center justify-center">
              <suggestion.icon className="h-5 w-5 text-brand-blue-start dark:text-brand-blue-dark" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium mb-1 
                             text-brand-blue-start dark:text-brand-blue-dark">
                {suggestion.type}
              </div>
              <p className="text-[15px] text-brand-light-text-primary 
                           dark:text-brand-dark-text-primary mb-3">
                {suggestion.content}
              </p>
              <Button
                className={cn(
                  "h-9 rounded-lg",
                  "bg-brand-blue-start dark:bg-brand-blue-dark",
                  "hover:bg-brand-blue-start/90 dark:hover:bg-brand-blue-dark/90",
                  "text-white text-sm font-medium"
                )}
              >
                Apply Suggestion
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
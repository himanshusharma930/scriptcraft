"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, FileText, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AiSuggestions } from "@/components/ai-suggestions"

export default function ScriptEditorPage() {
  const [title, setTitle] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [duration, setDuration] = useState("0s")

  return (
    <div className="fixed inset-0 bg-brand-light-bg dark:bg-brand-dark-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 
                      border-b border-brand-light-border dark:border-brand-dark-border">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold 
                         text-brand-light-text-primary dark:text-brand-dark-text-primary">
            Script Editor
          </h1>
          <div className="flex items-center gap-1 text-brand-gray-300 dark:text-brand-gray-dark">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-brand-blue-start dark:text-brand-blue-dark"
          >
            <FileText className="h-4 w-4 mr-1" />
            Templates
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative h-[calc(100vh-56px)]">
        <ScrollArea className="h-full p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Title Input */}
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title..."
              className={cn(
                "text-xl font-medium border-0 p-0 h-auto",
                "bg-transparent placeholder:text-brand-gray-300",
                "focus-visible:ring-0",
                "dark:placeholder:text-brand-gray-dark"
              )}
            />

            {/* Enhance with AI Button */}
            <Button
              onClick={() => setShowSuggestions(true)}
              className={cn(
                "w-full h-12 rounded-xl",
                "bg-brand-blue-start dark:bg-brand-blue-dark",
                "hover:bg-brand-blue-start/90 dark:hover:bg-brand-blue-dark/90",
                "text-white font-medium"
              )}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Enhance with AI
            </Button>

            {/* Add Section Button */}
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 rounded-xl",
                "border-brand-light-border dark:border-brand-dark-border",
                "text-brand-light-text-primary dark:text-brand-dark-text-primary",
                "hover:bg-brand-gray-100 dark:hover:bg-brand-dark-secondary"
              )}
            >
              + Add New Section
            </Button>
          </div>
        </ScrollArea>

        {/* AI Suggestions Panel */}
        {showSuggestions && (
          <div className={cn(
            "absolute inset-0 bg-white dark:bg-brand-dark-card",
            "transition-all duration-200"
          )}>
            <div className="flex items-center justify-between px-4 py-3 
                           border-b border-brand-light-border dark:border-brand-dark-border">
              <h2 className="text-lg font-semibold 
                            text-brand-light-text-primary dark:text-brand-dark-text-primary">
                AI Suggestions
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setShowSuggestions(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-112px)] p-4">
              <AiSuggestions />
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}
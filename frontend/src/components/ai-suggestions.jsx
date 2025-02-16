"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { generateContentSuggestions, CONTENT_PROMPTS } from "@/lib/ai-service"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

function SuggestionCard({ suggestion, onApply }) {
  return (
    <div
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
          <Sparkles className="h-5 w-5 text-brand-blue-start dark:text-brand-blue-dark" />
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
            onClick={() => onApply(suggestion)}
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
  )
}

export function AiSuggestions({ content, onApply }) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const generateSuggestions = async () => {
    setLoading(true)
    try {
      const results = await Promise.all([
        generateContentSuggestions(CONTENT_PROMPTS.scriptWriting + content),
        generateContentSuggestions(CONTENT_PROMPTS.hookWriting + content),
        generateContentSuggestions(CONTENT_PROMPTS.seoOptimization + content)
      ])

      setSuggestions(results.map((result, index) => ({
        type: Object.keys(CONTENT_PROMPTS)[index],
        content: result.choices[0].text
      })))
    } catch (error) {
      console.error('Failed to generate suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (content) {
      generateSuggestions()
    }
  }, [content])

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-brand-blue-start dark:text-brand-blue-dark" />
          </motion.div>
        </div>
      ) : (
        suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            suggestion={suggestion}
            onApply={onApply}
          />
        ))
      )}
    </div>
  )
}
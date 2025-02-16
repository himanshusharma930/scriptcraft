"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function MessageBubble({ message, isStreaming }) {
  const isAssistant = message.role === 'assistant'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex",
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3",
        "transition-all duration-200",
        "shadow-ios",
        isAssistant 
          ? "bg-brand-gray-100 dark:bg-brand-dark-secondary" 
          : "bg-brand-blue-start dark:bg-brand-blue-dark"
      )}>
        <p className={cn(
          "text-[15px] leading-relaxed",
          isAssistant
            ? "text-brand-light-text-primary dark:text-brand-dark-text-primary"
            : "text-white"
        )}>
          {message.content}
          {isStreaming && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              ▋
            </motion.span>
          )}
        </p>
      </div>
    </motion.div>
  )
}
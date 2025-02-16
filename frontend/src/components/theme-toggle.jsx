"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-10 h-10 rounded-full 
                 bg-transparent hover:bg-brand-light-bg/10
                 dark:hover:bg-brand-dark-secondary/50
                 transition-all duration-200"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-brand-blue-dark" />
      ) : (
        <Sun className="h-5 w-5 text-brand-blue-start" />
      )}
    </Button>
  )
}
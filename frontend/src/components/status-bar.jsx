"use client"

import { useEffect, useState } from "react"
import { Signal, Battery, Wifi } from "lucide-react"

export function StatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[44px] px-5
                    bg-brand-light-bg/80 dark:bg-brand-dark-bg/80 
                    backdrop-blur-xl">
      <div className="flex justify-between items-center h-full max-w-md mx-auto">
        <span className="text-[17px] font-semibold 
                        text-brand-light-text-primary dark:text-brand-dark-text-primary">
          {time}
        </span>
        <div className="flex items-center gap-2">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
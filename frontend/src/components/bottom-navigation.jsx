"use client"

import { Home, Search, FileText, User, Sparkles } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 
                    bg-brand-light-bg/90 dark:bg-brand-dark-bg/90 
                    backdrop-blur-xl border-t 
                    border-brand-light-border dark:border-brand-dark-border">
      <div className="flex items-center justify-between h-[83px] px-6 pt-2 pb-7 max-w-md mx-auto">
        <div className="flex items-center gap-16">
          <NavItem 
            icon={<Home className="h-6 w-6" />} 
            label="Projects" 
            active={pathname === '/'} 
            onClick={() => router.push('/')}
          />
          <NavItem 
            icon={<Search className="h-6 w-6" />} 
            label="Research"
            active={pathname === '/research'}
            onClick={() => router.push('/research')}
          />
        </div>

        {/* Center AI Button */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => router.push('/ai-assistant')}
            className={cn(
              "relative h-[58px] w-[58px] rounded-full -mt-8",
              "bg-gradient-to-r from-brand-blue-start to-brand-blue-end",
              "dark:from-brand-blue-dark dark:to-brand-blue-dark",
              "shadow-lg shadow-brand-blue-start/25 dark:shadow-brand-blue-dark/25",
              "transition-transform duration-200 active:scale-95"
            )}
          >
            <Sparkles className="h-7 w-7 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-16">
          <NavItem 
            icon={<FileText className="h-6 w-6" />} 
            label="Publishing"
            active={pathname === '/publishing'}
            onClick={() => router.push('/publishing')}
          />
          <NavItem 
            icon={<User className="h-6 w-6" />} 
            label="Profile"
            active={pathname === '/profile'}
            onClick={() => router.push('/profile')}
          />
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center"
    >
      <div className={cn(
        "mb-1 transition-colors duration-200",
        active 
          ? "text-brand-blue-start dark:text-brand-blue-dark" 
          : "text-brand-gray-300 dark:text-brand-gray-dark"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[10px] transition-colors duration-200",
        active 
          ? "text-brand-blue-start dark:text-brand-blue-dark" 
          : "text-brand-gray-300 dark:text-brand-gray-dark"
      )}>
        {label}
      </span>
    </button>
  )
}
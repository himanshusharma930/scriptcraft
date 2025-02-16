"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Settings, Home, FileText, Globe, User } from "lucide-react"
import { CreateButton } from "@/components/create-button"
import { CreateProjectSheet } from "@/components/create-project-sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCard } from "@/components/project-card"
import { BottomNavigation } from "@/components/bottom-navigation"
import { StatusBar } from "@/components/status-bar"
import { cn } from "@/lib/utils"

function HomePage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  return (
    <>
      <StatusBar />
      <div className={cn(
        "container max-w-md mx-auto px-4 pb-[88px] pt-[60px]",
        "bg-brand-light-bg dark:bg-brand-dark-bg",
        "transition-colors duration-200"
      )}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[34px] font-bold 
                         text-brand-light-text-primary dark:text-brand-dark-text-primary">
            My Projects
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              className="w-10 h-10 rounded-full 
                         hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Settings className="h-6 w-6 text-brand-blue-start dark:text-brand-blue-dark" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                            text-brand-gray-300 dark:text-brand-gray-dark
                            transition-colors duration-200" />
          <Input 
            placeholder="Search projects"
            className={cn(
              "h-[46px] pl-12 pr-12",
              "bg-white dark:bg-brand-dark-secondary",
              "border-0 rounded-2xl",
              "shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none",
              "placeholder:text-brand-gray-300 dark:placeholder:text-brand-gray-dark",
              "focus-visible:ring-2 focus-visible:ring-brand-blue-start dark:focus-visible:ring-brand-blue-dark",
              "transition-all duration-200"
            )}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full
                       hover:bg-black/5 dark:hover:bg-white/5"
          >
            <Filter className="h-5 w-5 text-brand-blue-start dark:text-brand-blue-dark" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className={`bg-[#E5E5EA] p-1.5 rounded-lg mb-8`}>
          {["All", "Draft", "In-Progress", "Completed"].map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              onClick={() => setActiveFilter(filter)}
              className={`
                flex-1 h-[32px] rounded-md text-[15px] font-medium
                ${activeFilter === filter 
                  ? 'bg-white text-[#1C1C1E] shadow-sm' 
                  : 'text-[#8E8E93] hover:text-[#1C1C1E]'
                }
              `}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Stats Card */}
        <Card className="mb-8 border-0 overflow-hidden rounded-[28px]
                        dark:bg-brand-dark-card">
          <div className="relative">
            <div className="absolute inset-0 bg-stats-gradient 
                           dark:bg-stats-gradient-dark" />
            <div className="relative px-8 py-6 grid grid-cols-3 gap-6">
              <StatItem number="2" label="Total Projects" />
              <StatItem number="1" label="In Progress" />
              <StatItem number="0" label="Completed" />
            </div>
          </div>
        </Card>

        {/* Project Cards */}
        <div className="space-y-4">
          <ProjectCard 
            status="In-Progress"
            title="How AI is Changing Content Creation"
            description="An in-depth look at AI tools for content creators"
            date="2024-02-20"
            progress={65}
          />
          <ProjectCard 
            status="Draft"
            title="Top 10 Programming Languages 2024"
            description="Comprehensive guide to trending programming languages"
            date="2024-02-19"
            progress={30}
          />
        </div>

        <BottomNavigation 
          onCreateClick={() => setCreateOpen(true)}
        />

        <CreateProjectSheet 
          open={createOpen} 
          onOpenChange={setCreateOpen}
        />
      </div>
    </>
  )
}

function StatItem({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-semibold text-white mb-1">
        {number}
      </div>
      <div className="text-sm text-white/90">{label}</div>
    </div>
  )
}

export default HomePage
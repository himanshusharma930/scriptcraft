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
import { cn } from "@/lib/utils"
import { FilterPopover } from "@/components/filter-popover"

function HomePage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  return (
    <>
      <div className={cn(
        "container max-w-md mx-auto px-4 pb-[88px]",
        "bg-brand-light-bg dark:bg-brand-dark-bg",
        "transition-colors duration-200"
      )}>
        {/* Header */}
        <div className="flex justify-between items-center pt-4 pb-6">
          <h1 className="text-[34px] font-semibold 
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

        {/* Search with Filter */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                            text-brand-gray-300 dark:text-brand-gray-dark" />
          <Input 
            placeholder="Search projects"
            className={cn(
              "h-[46px] pl-12 pr-12",
              "bg-white dark:bg-brand-dark-secondary",
              "border-0 rounded-2xl",
              "shadow-sm dark:shadow-none",
              "placeholder:text-brand-gray-300 dark:placeholder:text-brand-gray-dark",
              "focus-visible:ring-2 focus-visible:ring-brand-blue-start dark:focus-visible:ring-brand-blue-dark"
            )}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <FilterPopover 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
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

        {/* Project Cards - Now filtered */}
        <div className="space-y-4">
          {projects
            .filter(project => 
              activeFilter === "All" ? true : project.status === activeFilter
            )
            .map(project => (
              <ProjectCard 
                key={project.id}
                {...project}
              />
            ))}
        </div>
      </div>

      <CreateButton onClick={() => setCreateOpen(true)} />
      <BottomNavigation />

      <CreateProjectSheet 
        open={createOpen} 
        onOpenChange={setCreateOpen}
      />
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

// Example projects data
const projects = [
  {
    id: 1,
    status: "In-Progress",
    title: "How AI is Changing Content Creation",
    description: "An in-depth look at AI tools for content creators",
    date: "2024-02-20",
    progress: 65
  },
  {
    id: 2,
    status: "Draft",
    title: "Top 10 Programming Languages 2024",
    description: "Comprehensive guide to trending programming languages",
    date: "2024-02-19",
    progress: 30
  }
]

export default HomePage
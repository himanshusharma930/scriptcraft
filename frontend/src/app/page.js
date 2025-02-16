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

function HomePage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  return (
    <div className="container max-w-md mx-auto px-4 pb-[88px] pt-12 
                    bg-brand-light-bg dark:bg-brand-dark-bg
                    transition-colors duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[34px] font-semibold 
                       text-[#1C1C1E] dark:text-white">
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
            <Settings className="h-6 w-6 text-brand-blue-start" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                          text-brand-gray-300 dark:text-brand-gray-dark" />
        <Input 
          placeholder="Search projects"
          className="h-[46px] pl-12 pr-12 
                     bg-white dark:bg-brand-dark-secondary
                     border-0 rounded-2xl
                     shadow-sm dark:shadow-none
                     placeholder:text-brand-gray-300 
                     dark:placeholder:text-brand-gray-dark
                     dark:text-white"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
        >
          <Filter className="h-5 w-5 text-[#007AFF]" />
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 
                      bg-brand-light-bg/90 dark:bg-brand-dark-bg/90 
                      backdrop-blur-xl border-t 
                      border-brand-light-border dark:border-brand-dark-border">
        <div className={`flex justify-around items-center h-[83px] pt-2 pb-7 max-w-md mx-auto`}>
          <TabBarItem icon={<Home className="h-6 w-6" />} label="Projects" active />
          <TabBarItem icon={<Globe className="h-6 w-6" />} label="Research" />
          <div className="-mt-8">
            <CreateButton onClick={() => setCreateOpen(true)} />
          </div>
          <TabBarItem icon={<FileText className="h-6 w-6" />} label="Publishing" />
          <TabBarItem icon={<User className="h-6 w-6" />} label="Profile" />
        </div>
      </div>

      <CreateProjectSheet open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}

function TabBarItem({ icon, label, active }) {
  return (
    <button className="flex flex-col items-center">
      <div className={`mb-1 ${active ? 'text-[#007AFF]' : 'text-[#8E8E93] dark:text-brand-gray-dark'}`}>
        {icon}
      </div>
      <span className={`text-[10px] ${active ? 'text-[#007AFF]' : 'text-[#8E8E93] dark:text-brand-gray-dark'}`}>
        {label}
      </span>
    </button>
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
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Settings, Home, FileText, Globe, User, Plus } from "lucide-react"
import { CreateProjectSheet } from "@/components/create-project-sheet"
import { CreateButton } from "@/components/create-button"

const SPACING = {
  container: "px-4 pb-[88px] pt-12", // Account for status bar
  header: "mb-8",
  search: "mb-6",
  filters: "mb-8",
  stats: "mb-8",
  projects: "space-y-4",
  tabBar: "h-[83px] pt-2 pb-7" // iOS standard
}

export default function HomePage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  return (
    <div className="container max-w-md mx-auto px-4 pb-[88px] pt-12 bg-gradient-to-b from-[#F2F2F7] to-white">
      {/* Header */}
      <div className={`flex justify-between items-center ${SPACING.header}`}>
        <h1 className="text-[34px] font-semibold text-[#1C1C1E] leading-tight">
          My Projects
        </h1>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-11 h-11 rounded-full hover:bg-black/5"
        >
          <Settings className="h-6 w-6 text-[#007AFF]" />
        </Button>
      </div>

      {/* Search */}
      <div className={`relative ${SPACING.search}`}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8E8E93]" />
        <Input 
          placeholder="Search projects"
          className="h-[46px] pl-12 pr-12 bg-white border-0 rounded-2xl
                   shadow-sm placeholder:text-[#8E8E93]
                   focus-visible:ring-2 focus-visible:ring-[#007AFF]"
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
      <div className={`bg-[#E5E5EA] p-1.5 rounded-lg ${SPACING.filters}`}>
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
      <Card className="mb-8 border-0 overflow-hidden">
        <div className="relative">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-stats-gradient opacity-95" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* Content */}
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
      <div className="fixed bottom-0 left-0 right-0 bg-tab-blur backdrop-blur-xl border-t border-[#E5E5EA]">
        <div className={`flex justify-around items-center ${SPACING.tabBar} max-w-md mx-auto`}>
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

function ProjectCard({ status, title, description, date, progress }) {
  return (
    <Card className="p-5 bg-white rounded-2xl border-0 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <Badge 
          variant={status === "In-Progress" ? "default" : "secondary"}
          className={`
            rounded-full px-4 py-1 text-xs font-medium
            ${status === "In-Progress" 
              ? 'bg-[#007AFF] hover:bg-[#007AFF]/90' 
              : 'bg-[#E5E5EA] text-[#8E8E93]'
            }
          `}
        >
          {status}
        </Badge>
        <span className="text-sm text-[#8E8E93]">{date}</span>
      </div>
      <h3 className="text-lg font-semibold text-[#1C1C1E] mb-1">{title}</h3>
      <p className="text-sm text-[#8E8E93] mb-4">{description}</p>
      <div className="w-full h-2 bg-[#E5E5EA] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#34C759] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  )
}

function TabBarItem({ icon, label, active }) {
  return (
    <button className="flex flex-col items-center">
      <div className={`mb-1 ${active ? 'text-[#007AFF]' : 'text-[#8E8E93]'}`}>
        {icon}
      </div>
      <span className={`text-[10px] ${active ? 'text-[#007AFF]' : 'text-[#8E8E93]'}`}>
        {label}
      </span>
    </button>
  )
}

function StatItem({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-semibold text-white mb-1 relative">
        {/* Text Gradient */}
        <span className="relative z-10 drop-shadow-sm">{number}</span>
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-white/10 blur-sm" />
      </div>
      <div className="text-sm text-white/90">{label}</div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Settings, Home, FileText, Globe, User, Plus } from "lucide-react"
import { CreateProjectSheet } from "@/components/create-project-sheet"
import { CreateButton } from "@/components/create-button"

// Extract static class names
const STATIC_CLASSES = {
  header: "flex justify-between items-center py-4 sticky top-0 bg-[#F2F2F7]/80 backdrop-blur-lg z-10",
  searchBar: "h-[46px] pl-12 pr-12 bg-white border-0 rounded-2xl shadow-sm placeholder:text-[#8E8E93] focus-visible:ring-2 focus-visible:ring-[#007AFF]",
  statsCard: "rounded-3xl border-0 bg-gradient-to-r from-[#007AFF] to-[#0A84FF] shadow-lg overflow-hidden",
  projectCard: "p-4 bg-white rounded-2xl border-[#E5E5EA] shadow-sm hover:shadow-md transition-all",
  tabBar: "fixed bottom-0 left-0 right-0 bg-[#F2F2F7]/90 backdrop-blur-lg border-t border-[#E5E5EA]"
}

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  // Ensure client-side rendering for dynamic content
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="container max-w-md mx-auto px-4 pb-[88px] bg-[#F2F2F7]">
      {/* Header */}
      <div className={STATIC_CLASSES.header}>
        <h1 className="text-[34px] font-semibold text-[#1C1C1E] leading-tight">
          My Projects
        </h1>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-10 h-10 rounded-full hover:bg-black/5"
        >
          <Settings className="h-6 w-6 text-[#007AFF]" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8E8E93]" />
        <Input 
          placeholder="Search projects"
          className={STATIC_CLASSES.searchBar}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
        >
          <Filter className="h-5 w-5 text-[#007AFF]" />
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-[#E5E5EA] p-1 rounded-lg mb-6 flex">
        {["All", "Draft", "In-Progress", "Completed"].map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            onClick={() => setActiveFilter(filter)}
            className={`
              flex-1 h-8 rounded-md text-sm font-medium transition-all
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
      {isClient && (
        <Card className={STATIC_CLASSES.statsCard}>
          <div className="px-6 py-5 grid grid-cols-3 gap-4">
            <StatItem number="2" label="Total Projects" />
            <StatItem number="1" label="In Progress" />
            <StatItem number="0" label="Completed" />
          </div>
        </Card>
      )}

      {/* Project Cards */}
      <div className="space-y-4">
        {isClient && (
          <>
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
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className={STATIC_CLASSES.tabBar}>
        <div className="flex justify-around items-center h-[83px] pt-2 pb-7 px-6 max-w-md mx-auto">
          <TabBarItem icon={<Home />} label="Projects" active />
          <TabBarItem icon={<Globe />} label="Research" />
          <div className="-mt-8">
            <CreateButton onClick={() => setCreateOpen(true)} />
          </div>
          <TabBarItem icon={<FileText />} label="Publishing" />
          <TabBarItem icon={<User />} label="Profile" />
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
      <div className="text-3xl font-bold text-white mb-1">{number}</div>
      <div className="text-sm text-white/90">{label}</div>
    </div>
  )
}
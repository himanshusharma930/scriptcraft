"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Settings, Home, Globe, User, Plus, FileText } from "lucide-react"
import { CreateProjectSheet } from "@/components/create-project-sheet"
import { CreateButton } from "@/components/create-button"
import { useState } from "react"

function ProjectCard({ status, title, description, date }) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <Badge variant={status === "In-Progress" ? "default" : "secondary"}>
          {status}
        </Badge>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
        <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
      </div>
    </Card>
  )
}

function NavButton({ icon, label, active }) {
  return (
    <button 
      className={`flex flex-col items-center px-4 py-1 transition-colors
        ${active ? 'text-primary' : 'text-gray-500'}`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

export default function HomePage() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search projects" 
          className="pl-9 pr-12"
        />
        <Button variant="ghost" size="icon" className="absolute right-2 top-2">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button variant="default" className="rounded-full">All</Button>
        <Button variant="ghost" className="rounded-full">Draft</Button>
        <Button variant="ghost" className="rounded-full">In-Progress</Button>
        <Button variant="ghost" className="rounded-full">Completed</Button>
      </div>

      {/* Stats Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">2</div>
            <div className="text-sm">Total Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1</div>
            <div className="text-sm">In Progress</div>
          </div>
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm">Completed</div>
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
        />
        <ProjectCard 
          status="Draft"
          title="Top 10 Programming Languages 2024"
          description="Comprehensive guide to trending programming languages"
          date="2024-02-19"
        />
      </div>

      {/* Backdrop blur when sheet is open */}
      {createOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
      )}

      <CreateProjectSheet 
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      {/* Updated Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t">
        <div className="relative flex justify-around items-center py-2 max-w-md mx-auto">
          {/* Left Nav Items */}
          <NavButton icon={<Home className="h-6 w-6" />} label="Projects" active />
          <NavButton icon={<Globe className="h-6 w-6" />} label="Research" />
          
          {/* Center Create Button */}
          <div className="relative -top-6">
            <CreateButton onClick={() => setCreateOpen(true)} />
          </div>

          {/* Right Nav Items */}
          <NavButton icon={<FileText className="h-6 w-6" />} label="Publishing" />
          <NavButton icon={<User className="h-6 w-6" />} label="Profile" />
        </div>
      </div>
    </div>
  )
}
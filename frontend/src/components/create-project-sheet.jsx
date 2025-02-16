"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function CreateProjectSheet({ open, onOpenChange }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className={`
          h-[90vh] rounded-t-[10px] px-6
          transition-transform duration-300 ease-spring
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0
          data-[state=open]:fade-in-0
          data-[state=closed]:zoom-out-95
          data-[state=open]:zoom-in-95
          data-[state=closed]:slide-out-to-bottom
          data-[state=open]:slide-in-from-bottom
        `}
      >
        <SheetHeader className="mb-6">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
          <SheetTitle className="text-xl font-semibold text-center">Create New Project</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Project Title</Label>
            <Input 
              placeholder="Enter your project title"
              className="h-12 text-lg"
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <Label className="text-sm text-gray-600">Choose Template</Label>
            <div className="grid grid-cols-2 gap-3">
              {["Blank Project", "YouTube Script", "Blog Post", "Product Review"].map((template) => (
                <Button
                  key={template}
                  variant={selectedTemplate === template ? "default" : "outline"}
                  className="h-20 flex flex-col justify-center"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <span className="text-sm">{template}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Topic Tags */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Topics</Label>
            <div className="flex flex-wrap gap-2">
              {["Technology", "AI", "Business", "Education"].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Brief Description</Label>
            <Textarea 
              placeholder="What's your project about?"
              className="resize-none h-24"
            />
          </div>

          {/* Create Button */}
          <Button className="w-full h-12 mt-6">
            Create Project
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
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
        className="px-0 pt-0 pb-8 h-[85vh] rounded-t-[10px] border-t-0
                   bg-[#F2F2F7] overflow-hidden
                   motion-safe:animate-sheet-up"
      >
        {/* Pull Indicator */}
        <div className="sticky top-0 z-50 bg-[#F2F2F7] pt-2 pb-4">
          <div className="w-[36px] h-[5px] bg-[#E5E5EA] rounded-full mx-auto mb-2" />
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="h-full px-6">
          <div className="space-y-6 pb-8">
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-[22px] font-semibold text-[#1C1C1E]">
                Create New Project
              </h2>
            </div>

            {/* Project Title */}
            <div className="space-y-2">
              <Label className="text-[17px] text-[#1C1C1E]">Project Title</Label>
              <Input 
                placeholder="Enter project title"
                className="h-[44px] bg-white border-[#E5E5EA] 
                         text-[17px] placeholder:text-[#8E8E93]"
              />
            </div>

            {/* Template Selection */}
            <div className="space-y-3">
              <Label className="text-[17px] text-[#1C1C1E]">Choose Template</Label>
              <div className="grid grid-cols-2 gap-3">
                {["Blank Project", "YouTube Script", "Blog Post", "Product Review"].map((template) => (
                  <Button
                    key={template}
                    variant={selectedTemplate === template ? "default" : "outline"}
                    className={`
                      h-[66px] rounded-[12px] text-[15px]
                      ${selectedTemplate === template 
                        ? 'bg-[#007AFF] hover:bg-[#007AFF]/90 text-white' 
                        : 'bg-white border-[#E5E5EA] text-[#1C1C1E]'
                      }
                    `}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-[17px] text-[#1C1C1E]">Description</Label>
              <Textarea 
                placeholder="What's your project about?"
                className="min-h-[100px] bg-white border-[#E5E5EA] 
                         text-[17px] placeholder:text-[#8E8E93]"
              />
            </div>

            {/* Create Button */}
            <Button 
              className="w-full h-[50px] mt-8 bg-[#007AFF] hover:bg-[#007AFF]/90
                       text-[17px] font-semibold rounded-[12px]"
            >
              Create Project
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
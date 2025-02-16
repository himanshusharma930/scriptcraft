"use client"

import { 
  Sheet, 
  SheetContent,
  SheetTitle 
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react"
import { useSheetGestures } from "@/hooks/use-sheet-gestures"
import { cn } from "@/lib/utils"

const SHEET_CLASSES = {
  content: "px-0 pt-0 pb-8 h-[85vh] rounded-t-[32px] border-t-0 bg-[#F2F2F7] overflow-hidden",
  handle: "sticky top-0 z-50 bg-[#F2F2F7] pt-3 pb-4",
  input: "h-[46px] bg-white border-[#E5E5EA] rounded-xl text-[17px] placeholder:text-[#8E8E93] focus:ring-2 focus:ring-[#007AFF] transition-shadow duration-200",
  button: "h-[54px] bg-[#007AFF] hover:bg-[#007AFF]/90 text-[17px] font-semibold rounded-2xl"
}

export function CreateProjectSheet({ open, onOpenChange }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const scrollRef = useRef(null)
  const [isAtTop, setIsAtTop] = useState(true)

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    dragProgress,
    isDragging
  } = useSheetGestures({
    onClose: () => onOpenChange(false)
  })

  const handleScroll = (e) => {
    setIsAtTop(e.target.scrollTop === 0)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className={cn(
          SHEET_CLASSES.content,
          "motion-safe:animate-sheet-up",
          isDragging && 'transition-none',
          'transform-gpu'
        )}
        style={{
          transform: isDragging ? `translateY(${dragProgress}px)` : undefined,
          opacity: isDragging ? Math.max(1 - dragProgress / 400, 0.5) : 1
        }}
      >
        {/* Required SheetTitle for accessibility */}
        <SheetTitle className="sr-only">
          Create New Project
        </SheetTitle>

        {/* Drag Handle Area */}
        <div className={SHEET_CLASSES.handle}>
          <div className="w-[36px] h-[5px] bg-[#E5E5EA] rounded-full mx-auto" />
        </div>

        {/* Scrollable Content */}
        <ScrollArea 
          ref={scrollRef}
          className="h-full px-6 overflow-y-auto"
          onScroll={handleScroll}
          style={{
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="space-y-6 pb-8">
            {/* Visual Title (separate from SheetTitle) */}
            <div className="text-center mb-6">
              <h2 className="text-[24px] font-semibold text-[#1C1C1E]">
                Create New Project
              </h2>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Project Title */}
              <div className="space-y-2">
                <Label className="text-[17px] text-[#1C1C1E]">Project Title</Label>
                <Input 
                  placeholder="Enter project title"
                  className={cn(
                    SHEET_CLASSES.input,
                    "focus:ring-2 focus:ring-[#007AFF]"
                  )}
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
                      className={cn(
                        "h-[70px] rounded-2xl text-[15px]",
                        "transition-all duration-200",
                        selectedTemplate === template 
                          ? 'bg-[#007AFF] hover:bg-[#007AFF]/90 text-white shadow-sm' 
                          : 'bg-white border-[#E5E5EA] text-[#1C1C1E] hover:bg-gray-50'
                      )}
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
                  className={cn(
                    "min-h-[100px] bg-white border-[#E5E5EA]",
                    "text-[17px] placeholder:text-[#8E8E93]",
                    "focus:ring-2 focus:ring-[#007AFF]",
                    "transition-shadow duration-200"
                  )}
                />
              </div>

              {/* Create Button */}
              <Button 
                className={cn(
                  "w-full",
                  SHEET_CLASSES.button,
                  "mt-8 transition-all duration-200 active:scale-[0.98]"
                )}
              >
                Create Project
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
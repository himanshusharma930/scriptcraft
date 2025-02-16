"use client"

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function CreateProjectSheet({ open, onOpenChange }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className={cn(
          "px-0 pt-0 pb-8 h-[85vh] rounded-t-[32px] border-t-0",
          "bg-brand-light-bg dark:bg-brand-dark-bg",
          "transition-colors duration-200"
        )}
      >
        <SheetTitle className="sr-only">Create New Project</SheetTitle>

        {/* Drag Handle */}
        <div className={cn(
          "sticky top-0 z-50 pt-3 pb-4",
          "bg-brand-light-bg dark:bg-brand-dark-bg"
        )}>
          <div className="w-[36px] h-[5px] bg-brand-gray-100 dark:bg-brand-dark-secondary rounded-full mx-auto" />
        </div>

        {/* Content */}
        <ScrollArea className="h-full px-6">
          <div className="space-y-6 pb-8">
            <h2 className="text-[24px] font-semibold text-center 
                          text-brand-light-text-primary dark:text-brand-dark-text-primary">
              Create New Project
            </h2>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[17px] text-brand-light-text-primary dark:text-brand-dark-text-primary">
                  Project Title
                </Label>
                <Input 
                  placeholder="Enter project title"
                  className={cn(
                    "h-[46px] text-[17px]",
                    "bg-white dark:bg-brand-dark-secondary",
                    "border-brand-light-border dark:border-brand-dark-border",
                    "text-brand-light-text-primary dark:text-brand-dark-text-primary",
                    "placeholder:text-brand-gray-300 dark:placeholder:text-brand-gray-dark",
                    "focus-visible:ring-2 focus-visible:ring-brand-blue-start dark:focus-visible:ring-brand-blue-dark"
                  )}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[17px] text-brand-light-text-primary dark:text-brand-dark-text-primary">
                  Choose Template
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Blank Project", "YouTube Script", "Blog Post", "Product Review"].map((template) => (
                    <Button
                      key={template}
                      variant={selectedTemplate === template ? "default" : "outline"}
                      className={cn(
                        "h-[70px] rounded-2xl text-[15px]",
                        selectedTemplate === template 
                          ? "bg-brand-blue-start dark:bg-brand-blue-dark text-white" 
                          : "bg-white dark:bg-brand-dark-secondary border-brand-light-border dark:border-brand-dark-border",
                        "transition-all duration-200"
                      )}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[17px] text-brand-light-text-primary dark:text-brand-dark-text-primary">
                  Description
                </Label>
                <Textarea 
                  placeholder="What's your project about?"
                  className={cn(
                    "min-h-[100px] text-[17px]",
                    "bg-white dark:bg-brand-dark-secondary",
                    "border-brand-light-border dark:border-brand-dark-border",
                    "text-brand-light-text-primary dark:text-brand-dark-text-primary",
                    "placeholder:text-brand-gray-300 dark:placeholder:text-brand-gray-dark",
                    "focus-visible:ring-2 focus-visible:ring-brand-blue-start dark:focus-visible:ring-brand-blue-dark"
                  )}
                />
              </div>

              <Button 
                className={cn(
                  "w-full h-[54px] mt-8",
                  "bg-brand-blue-start dark:bg-brand-blue-dark",
                  "hover:bg-brand-blue-start/90 dark:hover:bg-brand-blue-dark/90",
                  "text-[17px] font-semibold rounded-2xl",
                  "transition-all duration-200"
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
"use client"

import { useState } from 'react'
import { debugLogger } from '@/lib/debug-utils'
import { ScrollArea } from '@/components/ui/scroll-area'

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
      >
        Debug
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-white p-4">
            <h3 className="text-lg font-semibold mb-4">Debug Logs</h3>
            <ScrollArea className="h-[calc(100vh-100px)]">
              {debugLogger.getLogs().map((log, i) => (
                <div key={i} className="mb-4 p-2 border rounded">
                  <div className="text-sm text-gray-500">{log.timestamp}</div>
                  <div className="font-medium">{log.category}</div>
                  <div>{log.message}</div>
                  {log.data && (
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  )
}
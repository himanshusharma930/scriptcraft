"use client"

import { createContext, useContext, useState } from 'react'

const AIContext = createContext({})

export function AIContextProvider({ children }) {
  const [context, setContext] = useState({
    type: 'scriptWriting',
    experienceLevel: 'intermediate',
    contentType: 'youtube_video',
    targetAudience: 'general',
    duration: '10-15 minutes',
    style: 'educational',
    keyMessage: '',
    focusAreas: ['hook', 'structure', 'engagement'],
    creativity: 0.7
  })

  return (
    <AIContext.Provider value={{ context, setContext }}>
      {children}
    </AIContext.Provider>
  )
}

export const useAIContext = () => useContext(AIContext)
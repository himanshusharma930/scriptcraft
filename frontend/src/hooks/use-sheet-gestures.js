"use client"

import { useState, useEffect } from 'react'

export function useSheetGestures({ onClose, threshold = 0.3 }) {
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const deltaY = e.touches[0].clientY - startY
    if (deltaY < 0) return // Prevent dragging up
    setCurrentY(deltaY)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const sheetHeight = window.innerHeight * 0.85 // 85vh
    const dismissThreshold = sheetHeight * threshold
    
    if (currentY > dismissThreshold) {
      onClose()
    }
    
    setIsDragging(false)
    setCurrentY(0)
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    dragProgress: currentY,
    isDragging
  }
}
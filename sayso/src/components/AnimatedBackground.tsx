"use client"
import { useEffect, useState } from 'react'

interface Shape {
  id: number
  type: 'circle' | 'triangle'
  color: 'royal-blue' | 'periwinkle' | 'orange' | 'peach'
  size: number
  x: number
  y: number
  rotation: number
  delay: number
  animationDuration: number
}

const colors = {
  'royal-blue': '#2563EB',
  'periwinkle': '#818CF8',
  'orange': '#F97316',
  'peach': '#FB923C',
}

export function AnimatedBackground() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Fixed layout - same shapes every time
    const fixedShapes: Shape[] = isMobile 
      ? [
          // Mobile layout (3 shapes) - more unique and spread out
          { id: 0, type: 'circle', color: 'royal-blue', size: 160, x: 85, y: 20, rotation: 0, delay: 0, animationDuration: 4 },
          { id: 1, type: 'triangle', color: 'periwinkle', size: 180, x: 15, y: 55, rotation: 0, delay: 1.5, animationDuration: 5 },
          { id: 2, type: 'circle', color: 'orange', size: 150, x: 70, y: 80, rotation: 0, delay: 3, animationDuration: 4.5 },
        ]
      : [
          // Desktop layout (6 shapes)
          { id: 0, type: 'circle', color: 'royal-blue', size: 220, x: 75, y: 20, rotation: 0, delay: 0, animationDuration: 4 },
          { id: 1, type: 'triangle', color: 'periwinkle', size: 250, x: 15, y: 35, rotation: 0, delay: 1.2, animationDuration: 5 },
          { id: 2, type: 'circle', color: 'orange', size: 200, x: 85, y: 50, rotation: 0, delay: 2.5, animationDuration: 4.5 },
          { id: 3, type: 'triangle', color: 'peach', size: 230, x: 25, y: 70, rotation: 0, delay: 0.8, animationDuration: 5.5 },
          { id: 4, type: 'circle', color: 'periwinkle', size: 190, x: 70, y: 75, rotation: 0, delay: 3.2, animationDuration: 4 },
          { id: 5, type: 'triangle', color: 'royal-blue', size: 210, x: 90, y: 40, rotation: 0, delay: 1.8, animationDuration: 5 },
        ]
    
    setShapes(fixedShapes)
  }, [isMobile])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape) => (
        <ShapeComponent key={shape.id} shape={shape} isMobile={isMobile} />
      ))}
    </div>
  )
}

function ShapeComponent({ shape, isMobile }: { shape: Shape; isMobile: boolean }) {
  // Single wrapper with both positioning and animations - NO ROTATION, NO SCALE
  const shapeStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    width: `${shape.size}px`,
    height: `${shape.size}px`,
    transform: `translate(-50%, -50%) translateY(0px) translateZ(0)`,
    opacity: 0.3,
    animation: isMobile
      ? `fadeFloatMobile ${shape.animationDuration * 2}s ease-in-out infinite`
      : `fadeFloat ${shape.animationDuration * 1.5}s ease-in-out infinite`,
    animationDelay: `${shape.delay}s`,
    animationFillMode: 'both',
    filter: 'blur(0.5px)',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }

  const getShapeContent = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: colors[shape.color],
    }

    switch (shape.type) {
      case 'circle':
        return {
          ...baseStyle,
          borderRadius: '50%',
        }
      case 'triangle':
        return {
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }
    }
  }

  return (
    <div style={shapeStyle}>
      <div style={getShapeContent()} />
    </div>
  )
}



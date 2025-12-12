import React from 'react'

type BrandLogoProps = {
  size?: number
  className?: string
  showText?: boolean
}

export function BrandLogo({ size = 32, className, showText = false }: BrandLogoProps) {
  // Match the exact font height - text-2xl font-bold has a visual height around 20-22px
  // We'll use 20px to match the x-height/cap-height of the font
  const shapeSize = showText ? 20 : size
  const circleRadius = shapeSize / 2
  const triangleSize = shapeSize
  
  // Position shapes side by side with 0 gap between them
  const svgWidth = shapeSize + shapeSize // No gap between shapes
  const svgHeight = shapeSize
  
  // Circle positioned on the left
  const circleX = circleRadius
  const circleY = circleRadius
  
  // Triangle positioned immediately to the right of the circle (0 gap)
  const triangleCenterX = shapeSize + shapeSize / 2
  const triangleTopY = shapeSize / 2 - triangleSize / 2
  const triangleLeftX = triangleCenterX - triangleSize / 2
  const triangleRightX = triangleCenterX + triangleSize / 2
  const triangleBottomY = shapeSize / 2 + triangleSize / 2
  
  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Blue circle on the left */}
        <circle
          cx={circleX}
          cy={circleY}
          r={circleRadius}
          fill="#2563EB"
        />
        
        {/* Orange triangle immediately to the right of the circle */}
        <polygon
          points={`${triangleCenterX},${triangleTopY} ${triangleLeftX},${triangleBottomY} ${triangleRightX},${triangleBottomY}`}
          fill="#F97316"
        />
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold text-black tracking-tight">
          feedkit
        </span>
      )}
    </div>
  )
}



'use client'

import React from 'react'

export default function FiberGaugeChart({
    value,
    maxValue,
    size = 50,
    fillColor = '#228B22',
    strokeColor = '#228B22',
}) {
    const percentage = value / maxValue

    const leafPath = `
    M ${size * 0.25} ${size * 0.5}
    C ${size * 0.375} ${size * 0.25}, ${size * 0.625} ${size * 0.25}, ${size * 0.75} ${size * 0.5}
    C ${size * 0.875} ${size * 0.75}, ${size * 0.625} ${size}, ${size * 0.5} ${size}
    C ${size * 0.375} ${size}, ${size * 0.125} ${size * 0.75}, ${size * 0.25} ${size * 0.5}
    Z
  `

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
                <clipPath id={`leafClip-${size}`}>
                    <path d={leafPath} />
                </clipPath>
            </defs>
            <g clipPath={`url(#leafClip-${size})`}>
                <rect
                    x="0"
                    y={size - size * percentage}
                    width={size}
                    height={size * percentage}
                    fill={fillColor}
                />
            </g>
            <path
                d={leafPath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="10"
            />
        </svg>
    )
}

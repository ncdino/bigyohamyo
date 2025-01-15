'use client'
import React, { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export default function GaugeChart({
    value = 0,
    maxValue = 100,
    strokeWidth = 20,
    color = 'blue',
    emptyColor = '#eee',
    label,
    unit,
    animated = false,
    className,
    size = 80,
}) {
    const radius = size / 2 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const initialProgress = animated ? 0 : (value / maxValue) * circumference
    const [progress, setProgress] = useState(initialProgress)

    const angle = (value / maxValue) * 180

    useEffect(() => {
        if (animated) {
            let animationFrameId
            let startTimestamp = null
            const duration = 1000

            const animate = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp
                const progressValue = Math.min(
                    timestamp - startTimestamp,
                    duration,
                )
                const newProgress =
                    (progressValue / duration) *
                    ((value / maxValue) * circumference)
                setProgress(newProgress)
                if (progressValue < duration) {
                    animationFrameId = requestAnimationFrame(animate)
                }
            }
            animationFrameId = requestAnimationFrame(animate)

            return () => cancelAnimationFrame(animationFrameId)
        } else {
            setProgress((value / maxValue) * circumference)
        }
    }, [value, animated, maxValue, circumference, size])

    return (
        <div className={twMerge(`relative overflow-hidden`, className)}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={emptyColor}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${progress} ${circumference - progress}`}
                    strokeLinecap="round"
                    transform={`rotate(-180 ${size / 2} ${size / 2})`}
                    className={`transition-stroke-dasharray duration-300 ease-in-out ${!animated && 'transition-none'}`}
                />
            </svg>
            {label && (
                <div
                    className={`absolute top-[70%] lg:top-[65%] left-1/2 -translate-x-1/2 text-center text-xl lg:text-2xl`}
                >
                    {typeof label === 'number' ? label.toFixed(1) : label}
                </div>
            )}
        </div>
    )
}

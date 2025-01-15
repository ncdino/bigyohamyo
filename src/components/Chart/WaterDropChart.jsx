'use client'

import React from 'react'
import { motion } from 'framer-motion'

const WaterDropChart = ({
    value,
    maxValue,
    size = 100,
    fillColor = '#3b82f6',
    strokeColor = '#000',
    className,
}) => {
    const percentage = value / maxValue
    const waveAmplitude = 3
    const waveFrequency = 2
    const offset = 2

    const dropPath = `
    M12,20a6,6,0,0,1-6-6c0-4,6-10.8,6-10.8S18,10,18,14A6,6,0,0,1,12,20Z
  `

    const wavePathData = `
    M 0,24
    L 0,${24 - 24 * percentage}
    C 6,${24 - 24 * percentage - waveAmplitude},10,${24 - 24 * percentage + waveAmplitude},12,${24 - 24 * percentage}
    C 14,${24 - 24 * percentage - waveAmplitude},18,${24 - 24 * percentage + waveAmplitude},24,${24 - 24 * percentage}
    L 24,24
    Z
  `

    // 애니메이션 variants
    const waveVariants = {
        hidden: {
            d: `
        M 0,24
        L 0,${24 - 24 * percentage}
        C 6,${24 - 24 * percentage},10,${24 - 24 * percentage},12,${24 - 24 * percentage}
        C 14,${24 - 24 * percentage},18,${24 - 24 * percentage},24,${24 - 24 * percentage}
        L 24,24
        Z
      `,
        },
        visible: {
            d: wavePathData,
            transition: {
                duration: 1,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
            },
        },
    }

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
        >
            <defs>
                <clipPath id="dropClip">
                    <motion.path
                        variants={waveVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </clipPath>
            </defs>
            <g clipPath="url(#dropClip)">
                <path d={dropPath} fill={fillColor} strokeWidth="0" />
            </g>
            <path
                d={dropPath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1"
            />
        </svg>
    )
}

export default WaterDropChart

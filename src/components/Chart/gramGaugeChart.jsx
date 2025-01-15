'use client'

import { motion } from 'framer-motion'

export default function GaugeChart({
    value = 50,
    size = 200,
    strokeColor = '#BB6464',
    bgColor = '#e5e7eb',
}) {
    const radius = 90
    const circumference = 2 * Math.PI * radius
    const progress = (value / 100) * circumference

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <svg width={size} height={size} viewBox="0 0 220 220">
                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    stroke={bgColor}
                    strokeWidth="20"
                    fill="none"
                />
                <motion.circle
                    cx="110"
                    cy="110"
                    r={radius}
                    stroke={strokeColor}
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - progress }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
            </svg>

            <p className="mt-4 text-2xl font-semibold">{value}%</p>
        </div>
    )
}

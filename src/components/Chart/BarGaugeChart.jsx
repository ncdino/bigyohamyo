import React from 'react'

export default function BarGaugeChart({
    percentage,
    label = 'Progress',
    width = 300,
    height = 40,
}) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center font-semibold mb-4">{label}</div>
            <div
                className="relative bg-gray-200 rounded-full overflow-hidden"
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                {/* Progress */}
                <div
                    className="absolute h-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${percentage}%` }}
                >
                    {percentage > 10 && `${percentage.toFixed(1)}%`}
                </div>
            </div>
        </div>
    )
}

import React from 'react'

export function BarRatioChart({
    component1,
    component2,
    component1Label = 'Component 1',
    component2Label = 'Component 2',
    size = 50,
}) {
    const total = component1 + component2
    const percentage1 = (component1 / total) * 100
    const percentage2 = (component2 / total) * 100
    const width = size * 10
    const height = size

    return (
        <div className="w-full" style={{ maxWidth: `${width}px` }}>
            {' '}
            {/* max-width를 width로 설정 */}
            <div
                className="relative bg-gray-200 rounded-full overflow-hidden"
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                {/* Component 1 */}
                <div
                    className="absolute h-full bg-[#E0E0E0] flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${percentage1}%` }}
                >
                    {percentage1 > 10 && component1Label}
                </div>
                {/* Component 2 */}
                <div
                    className="absolute h-full bg-[#FF5733] flex items-center justify-center text-white text-xs font-semibold"
                    style={{
                        left: `${percentage1}%`,
                        width: `${percentage2}%`,
                    }}
                >
                    {percentage2 > 10 && component2Label}
                </div>
            </div>
            <div className="flex justify-between mt-2 text-sm md:text-lg font-normal text-gray-700">
                <div className="inline-flex">
                    <p>칼슘 : {component1.toFixed(1)}</p> (
                    <p>{percentage1.toFixed(1)}%)</p>
                </div>
                <div className="inline-flex">
                    <p>인 : {component2.toFixed(1)}</p> (
                    <p>{percentage2.toFixed(1)}%)</p>
                </div>
            </div>
        </div>
    )
}

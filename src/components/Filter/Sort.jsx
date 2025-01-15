'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function DrySort({ onSortChange, type, className }) {
    const getSortOptions = () => {
        if (type === 'dryFood') {
            return [
                { value: '', label: '선택' },
                { value: '탄수화물-asc', label: '탄수화물 ↓' },
                { value: '탄수화물-desc', label: '탄수화물 ↑' },
                { value: '단백질-asc', label: '단백질 ↓' },
                { value: '단백질-desc', label: '단백질 ↑' },
                { value: '지방-asc', label: '지방 ↓' },
                { value: '지방-desc', label: '지방 ↑' },
                { value: '열량-asc', label: '열량 ↓' },
                { value: '열량-desc', label: '열량 ↑' },
                { value: '100g당가격-asc', label: '가격 ↓' },
                { value: '100g당가격-desc', label: '가격 ↑' },
            ]
        } else if (type === 'wetFood') {
            return [
                { value: '', label: '선택' },
                { value: 'calculateCaloriesPer100g-asc', label: '열량 ↓' },
                { value: 'calculateCaloriesPer100g-desc', label: '열량 ↑' },
                { value: '조단백-asc', label: '조단백 ↓' },
                { value: '조단백-desc', label: '조단백 ↑' },
                { value: '조지방-asc', label: '조지방 ↓' },
                { value: '조지방-desc', label: '조지방 ↑' },
                { value: '수분-asc', label: '수분 ↓' },
                { value: '수분-desc', label: '수분 ↑' },
            ]
        } else if (type === 'package') {
            return [
                { value: '', label: '선택' },
                { value: '파테', label: '열량 ↓' },
                { value: '슈레드', label: '열량 ↑' },
                { value: '청키', label: '조단백 ↓' },
                { value: '플레이크', label: '조단백 ↑' },
                { value: '민스', label: '조지방 ↓' },
                { value: '스튜', label: '조지방 ↑' },
            ]
        } else {
            return [{ value: '', label: '선택' }]
        }
    }

    const sortOptions = getSortOptions()

    return (
        <div>
            <label
                htmlFor="sortBy"
                className="font-normal text-gray-300 block mb-2"
            >
                정렬
            </label>
            <select
                id="sortBy"
                className={twMerge(
                    'border border-gray-300 p-2 rounded bg-transparent text-white',
                    className,
                )}
                onChange={(e) => onSortChange(e.target.value)}
            >
                {sortOptions.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-black"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

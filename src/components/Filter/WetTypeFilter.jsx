'use client'

import React, { useState, useMemo } from 'react'

const DryFilter = ({ onFilterChange, className }) => {
    const filterOptions = [
        { value: '파테', label: '열량 ↓' },
        { value: '슈레드', label: '열량 ↑' },
        { value: '청키', label: '조단백 ↓' },
        { value: '플레이크', label: '조단백 ↑' },
        { value: '민스', label: '조지방 ↓' },
        { value: '스튜', label: '조지방 ↑' },
    ]

    const [checkedFilters, setCheckedFilters] = useState({})

    const handleCheckboxChange = (value) => {
        setCheckedFilters((prevFilters) => ({
            ...prevFilters,
            [value]: !prevFilters[value], // toggle checked state
        }))
        onFilterChange(checkedFilters)
    }

    return (
        <div className={className}>
            {filterOptions.map((option) => (
                <label key={option.value} className="block mb-2">
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={!!checkedFilters[option.value]}
                        onChange={() => handleCheckboxChange(option.value)}
                        className="mr-2"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    )
}

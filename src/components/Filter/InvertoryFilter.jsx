'use client'

import React from 'react'

export default function BrandFilters({ brands, onFilterChange }) {
    return (
        <div>
            <label
                htmlFor="brand"
                className="font-normal text-gray-300 block mb-2"
            >
                브랜드
            </label>
            <select
                id="brand"
                className="w-full border border-gray-300 p-2 rounded bg-transparent"
                onChange={(e) => onFilterChange('브랜드', e.target.value)} // 필터 키를 '브랜드'로 변경
            >
                <option className="bg-black" value="">
                    모두
                </option>
                {brands.map((brand) => (
                    <option className="bg-black" key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
        </div>
    )
}

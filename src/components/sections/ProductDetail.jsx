'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import dryFeedData from '@/app/data/food.json'
import wetFeedData from '@/app/data/wet_output.json'

async function fetchSearchResults(query, combinedData) {
    if (!query) return []

    const lowerCaseQuery = query.toLowerCase()
    return combinedData.filter((item) => {
        const combinedName = `${item['브랜드']} ${item['제품명']}`.toLowerCase()
        return combinedName.includes(lowerCaseQuery)
    })
}

export default function HeaderProductSearch() {
    const [searchQuery, setSearchQuery] = useState('')

    const {
        data: dryFood,
        isLoading: dryFoodIsLoading,
        error: dryFoodError,
    } = useQuery({
        queryKey: ['dryFood'],
        queryFn: () => Promise.resolve(dryFeedData),
        staleTime: 60 * 60 * 1000,
    })

    const {
        data: wetFood,
        isLoading: wetFoodIsLoading,
        error: wetFoodError,
    } = useQuery({
        queryKey: ['wetFood'],
        queryFn: () => Promise.resolve(wetFeedData),
        staleTime: 60 * 60 * 1000,
    })

    const combinedData = [
        ...(dryFood || []).map((item) => ({ ...item, source: 'food' })),
        ...(wetFood || []).map((item) => ({ ...item, source: 'wet' })),
    ]

    const { data, isLoading, error } = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: () => fetchSearchResults(searchQuery, combinedData),
        enabled: !!(dryFood && wetFood),
        staleTime: Infinity,
    })

    return (
        <div className="mx-auto p-4 h-auto">
            <div className="flex flex-col space-y-4 mb-4">
                <input
                    type="text"
                    placeholder="빠른 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border-b-2 border-gray-300 rounded focus:outline-none"
                />

                {(isLoading || dryFoodIsLoading || wetFoodIsLoading) && (
                    <p className="text-sm text-gray-500">검색 중...</p>
                )}
                {(error || dryFoodError || wetFoodError) && (
                    <p className="text-sm text-red-500">오류 발생</p>
                )}

                {searchQuery && data && data.length > 0 && (
                    <div className="relative w-full">
                        <ul className="mt-2 border border-gray-200 rounded z-10 absolute overflow-y-auto max-h-36 md:max-h-64">
                            {data.map((result) => (
                                <li
                                    key={result.id}
                                    className="text-sm p-2 cursor-pointer hover:bg-gray-100 text-black"
                                >
                                    <Link
                                        href={`/${result.source === 'food' ? 'foods' : 'wetfoods'}/${result.id}`}
                                    >
                                        {`${result['브랜드']} ${result['제품명']}`}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {searchQuery && data && data.length === 0 && (
                    <p className="text-sm text-gray-500">
                        검색 결과가 없습니다.
                    </p>
                )}
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import searchData from '@/app/data/food.json'
import ProductDetailCard from '../Card/ProductDetailCard'

async function fetchSearchResults(query) {
    if (!query) return []
    const lowerCaseQuery = query.toLowerCase()

    return searchData.filter((item) => {
        const combinedName = `${item['브랜드']} ${item['제품명']}`.toLowerCase()
        return combinedName.includes(lowerCaseQuery)
    })
}

export default function ProductCompare() {
    const router = useRouter()
    const [searchQuery1, setSearchQuery1] = useState('')
    const [searchQuery2, setSearchQuery2] = useState('')
    const [selectedFood1, setSelectedFood1] = useState(null)
    const [selectedFood2, setSelectedFood2] = useState(null)

    const {
        data: filteredFoods1,
        isLoading: isLoading1,
        isError: isError1,
    } = useQuery({
        queryKey: ['search', searchQuery1],
        queryFn: () => fetchSearchResults(searchQuery1),
        staleTime: Infinity,
    })

    const {
        data: filteredFoods2,
        isLoading: isLoading2,
        isError: isError2,
    } = useQuery({
        queryKey: ['search', searchQuery2],
        queryFn: () => fetchSearchResults(searchQuery2),
        staleTime: Infinity,
    })

    const handleCompare = () => {
        if (selectedFood1 && selectedFood2) {
            router.push(
                `/compare?food1=${selectedFood1.id}&food2=${selectedFood2.id}`,
            )
        } else {
            alert('두 제품을 모두 선택해주세요.')
        }
    }

    const handleFoodSelect = (food, setFood, setQuery, selectedFood) => {
        if (selectedFood && selectedFood.id === food.id) {
            setFood(null)
            setQuery('')
        } else {
            setFood(food)
            setQuery(`${food['브랜드']} ${food['제품명']}`)
        }
    }

    return (
        <section id="productcompare">
            <div className="container font-paperlogy tracking-tighter py-20">
                <ProductDetailCard className="min-h-screen">
                    <div className="mx-auto p-4">
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/2 p-4 rounded">
                                <input
                                    type="text"
                                    placeholder="브랜드와 제품명 입력 1"
                                    value={searchQuery1}
                                    onChange={(e) => {
                                        setSearchQuery1(e.target.value)
                                        if (
                                            selectedFood1 &&
                                            e.target.value !==
                                                `${selectedFood1['브랜드']} ${selectedFood1['제품명']}`
                                        ) {
                                            setSelectedFood1(null)
                                        }
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-lime-300"
                                />
                                {isLoading1 && (
                                    <p className="text-sm text-gray-500">
                                        검색 중...
                                    </p>
                                )}
                                {searchQuery1 && filteredFoods1 && (
                                    <ul className="mt-2 rounded">
                                        {filteredFoods1.map((food) => (
                                            <li
                                                key={food.id}
                                                onClick={() =>
                                                    handleFoodSelect(
                                                        food,
                                                        setSelectedFood1,
                                                        setSearchQuery1,
                                                        selectedFood1,
                                                    )
                                                }
                                                className={`p-2 cursor-pointer text-black hover:bg-gray-100 ${
                                                    selectedFood1 &&
                                                    selectedFood1.id === food.id
                                                        ? 'bg-blue-200'
                                                        : ''
                                                }`}
                                            >
                                                {food['브랜드']}{' '}
                                                {food['제품명']}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* 두 번째 입력 필드 */}
                            <div className="w-1/2 p-4 rounded">
                                <input
                                    type="text"
                                    placeholder="브랜드와 제품명 입력 2"
                                    value={searchQuery2}
                                    onChange={(e) => {
                                        setSearchQuery2(e.target.value)
                                        if (
                                            selectedFood2 &&
                                            e.target.value !==
                                                `${selectedFood2['브랜드']} ${selectedFood2['제품명']}`
                                        ) {
                                            setSelectedFood2(null)
                                        }
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-lime-300"
                                />
                                {isLoading2 && (
                                    <p className="text-sm text-gray-500">
                                        검색 중...
                                    </p>
                                )}
                                {searchQuery2 && filteredFoods2 && (
                                    <ul className="mt-2 border border-gray-200 rounded">
                                        {filteredFoods2.map((food) => (
                                            <li
                                                key={food.id}
                                                onClick={() =>
                                                    handleFoodSelect(
                                                        food,
                                                        setSelectedFood2,
                                                        setSearchQuery2,
                                                        selectedFood2,
                                                    )
                                                }
                                                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                                    selectedFood2 &&
                                                    selectedFood2.id === food.id
                                                        ? 'bg-blue-200'
                                                        : ''
                                                }`}
                                            >
                                                {food['브랜드']}{' '}
                                                {food['제품명']}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* 비교 버튼 */}
                        <div className="flex items-center justify-center">
                            <button
                                onClick={handleCompare}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                비교하기
                            </button>
                        </div>
                    </div>
                </ProductDetailCard>
            </div>
        </section>
    )
}

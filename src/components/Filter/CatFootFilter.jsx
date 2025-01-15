'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import searchData from '@/app/data/food.json'

function CatFoodFilter() {
    const [selectedFilter, setSelectedFilter] = useState('')

    const fetchFilteredResults = async (filter) => {
        return searchData.filter((item) => {
            if (!filter) return true
            switch (filter) {
                case 'priceLowToHigh':
                    return true
                case 'grainFree':
                    return item['그레인프리'] !== ''
                case 'millFree':
                    return item['밀프리'] !== ''
                case 'lowCaution':
                    return item['주의성분'] <= 2
                default:
                    return item['브랜드'] === filter
            }
        })
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['filteredResults', selectedFilter],
        queryFn: () => fetchFilteredResults(selectedFilter),
        staleTime: Infinity,
    })

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter)
    }

    const handleResetFilters = () => {
        setSelectedFilter('')
    }

    const uniqueBrands = Array.from(
        new Set(searchData.map((item) => item['브랜드'])),
    )

    return (
        <section id="productdetail">
            <div className="container font-paperlogy tracking-tighter">
                <div className="mx-auto p-4 border rounded-[27px] bg-primary h-auto">
                    {/* Filters */}
                    <div className="flex flex-wrap justify-start space-x-4 mb-4">
                        <button
                            onClick={() => handleFilterClick('priceLowToHigh')}
                            className={`px-4 py-2 border rounded-lg ${selectedFilter === 'priceLowToHigh' ? 'bg-lime-300' : 'bg-gray-200'}`}
                        >
                            가격 낮은 순
                        </button>
                        <button
                            onClick={() => handleFilterClick('grainFree')}
                            className={`px-4 py-2 border rounded-lg ${selectedFilter === 'grainFree' ? 'bg-lime-300' : 'bg-gray-200'}`}
                        >
                            그레인프리
                        </button>
                        <button
                            onClick={() => handleFilterClick('millFree')}
                            className={`px-4 py-2 border rounded-lg ${selectedFilter === 'millFree' ? 'bg-lime-300' : 'bg-gray-200'}`}
                        >
                            밀프리
                        </button>
                        <button
                            onClick={() => handleFilterClick('lowCaution')}
                            className={`px-4 py-2 border rounded-lg ${selectedFilter === 'lowCaution' ? 'bg-lime-300' : 'bg-gray-200'}`}
                        >
                            주의성분 낮음
                        </button>
                        {uniqueBrands.map((brand) => (
                            <button
                                key={brand}
                                onClick={() => handleFilterClick(brand)}
                                className={`px-4 py-2 border rounded-lg ${selectedFilter === brand ? 'bg-lime-300' : 'bg-gray-200'}`}
                            >
                                {brand}
                            </button>
                        ))}
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 border rounded-lg bg-red-200"
                        >
                            필터 초기화
                        </button>
                    </div>
                    <div>
                        {isLoading && <p>로딩 중...</p>}
                        {error && <p>오류가 발생했습니다.</p>}
                        {data && (
                            <ul className="space-y-2">
                                {selectedFilter === 'priceLowToHigh'
                                    ? data
                                          .sort(
                                              (a, b) =>
                                                  a['가격(\\)'] - b['가격(\\)'],
                                          )
                                          .map((item) => (
                                              <li
                                                  key={item.id}
                                                  className="p-2 border rounded"
                                              >
                                                  <p>{`${item['브랜드']} - ${item['제품명']} (₩${item['가격(\\)']})`}</p>
                                              </li>
                                          ))
                                    : data.map((item) => (
                                          <li
                                              key={item.id}
                                              className="p-2 border rounded"
                                          >
                                              <p>{`${item['브랜드']} - ${item['제품명']} (₩${item['가격(\\)']})`}</p>
                                          </li>
                                      ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CatFoodFilter

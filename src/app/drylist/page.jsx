'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import dryFood from '@/app/data/food.json'
import ProductDetailCard from '@/components/Card/ProductDetailCard'
import Sort from '@/components/Filter/Sort'
import Link from 'next/link'
import { debounce } from 'lodash'
import AddCart from '@/components/svg/AddCart'
import { motion } from 'framer-motion'
import BrandFilters from '@/components/Filter/InvertoryFilter'
import Menu from '@/components/Menu/MenuButton'

async function fetchFoodData(searchTerm = '', filters = {}, sort = '') {
    let data = [...dryFood]

    if (searchTerm) {
        data = data.filter(
            (item) =>
                item.제품명.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.브랜드.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }

    data = Object.entries(filters).reduce((filteredData, [key, value]) => {
        return value
            ? filteredData.filter((item) => item[key] === value)
            : filteredData
    }, data)

    // 정렬 algo
    if (sort) {
        const [sortBy, sortOrder] = sort.split('-')
        data.sort((a, b) => {
            const aValue =
                typeof a[sortBy] === 'number'
                    ? a[sortBy]
                    : parseFloat(a[sortBy])
            const bValue =
                typeof b[sortBy] === 'number'
                    ? b[sortBy]
                    : parseFloat(b[sortBy])

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue)
            } else if (
                typeof aValue === 'number' &&
                typeof bValue === 'number'
            ) {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
            } else {
                return 0
            }
        })
    }

    return data
}

export default function DryList() {
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [food1, setFood1] = useState(null)
    const [food2, setFood2] = useState(null)
    const [foodId1, setFoodId1] = useState(null)
    const [foodId2, setFoodId2] = useState(null)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value })
    }

    const toggleCart = () => setIsCartOpen(!isCartOpen)

    const handleSortChange = (value) => {
        setSort(value)
    }

    const handleCompare = (food) => {
        const foodInfo = `${food.브랜드} - ${food.제품명}`
        if (food1 === null) {
            setFood1(foodInfo)
            setFoodId1(food.id)
        } else if (food2 === null) {
            setFood2(foodInfo)
            setFoodId2(food.id)
        } else {
            alert('비교할 사료는 최대 2개까지 선택 가능합니다.')
        }
    }

    const handleRemove = (foodInfo) => {
        if (food1 === foodInfo) {
            setFood1(null)
            setFoodId1(null)
        } else if (food2 === foodInfo) {
            setFood2(null)
            setFoodId2(null)
        }
    }

    const handleSearchTermChange = (e) => {
        const newSearchTerm = e.target.value
        setSearchTerm(newSearchTerm)
        debouncedFetchData(newSearchTerm, filters, sort)
    }

    // 브랜드 목록 빼기
    const brands = [...new Set(dryFood.map((item) => item['브랜드']))]

    const {
        data: filteredData,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['dryFood', filters, sort],
        queryFn: () => fetchFoodData(searchTerm, filters, sort),
        enabled: false, // 초기 자동 실행 방지
    })

    const debouncedFetchData = useCallback(
        debounce((searchTerm, filters, sort) => {
            refetch({ queryKey: ['dryFood', filters, sort] })
        }, 500),
        [],
    )

    useEffect(() => {
        debouncedFetchData(searchTerm, filters, sort)
    }, [filters, sort, searchTerm, debouncedFetchData])
    const itemCount = [food1, food2].filter(Boolean).length

    if (isLoading) return <div>로딩중</div>
    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className="font-paperlogy bg-gradient-to-r from-[#1F1C2C] to-[#928DAB] min-h-screen text-white pb-20">
            <div className="p-2">
                <Menu />
            </div>
            <div className="container py-8 lg:py-14">
                {food1 && (
                    <div
                        className="fixed top-4 right-4 z-50 cursor-pointer"
                        onClick={toggleCart}
                    >
                        <motion.div
                            className="w-15 h-15 rounded-lg"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                repeatDelay: 5,
                                type: 'spring',
                            }}
                        >
                            <AddCart />
                        </motion.div>
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </div>
                )}

                {/* 장바구니 시작 */}
                {isCartOpen && (
                    <div className="fixed top-12 right-4 bg-white text-black shadow-2xl rounded-xl p-4 w-64 z-50">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">장바구니</h3>
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="text-gray-500 border-b-2 px-2 py-1 font-bold"
                            >
                                닫기
                            </button>
                        </div>

                        <div className="mt-2">
                            {[food1, food2].filter(Boolean).length > 0 ? (
                                [food1, food2]
                                    .filter(Boolean)
                                    .map((food, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b py-2"
                                        >
                                            <span>{food}</span>
                                            <button
                                                onClick={() =>
                                                    handleRemove(food)
                                                }
                                                className="text-red-500 font-bold"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-gray-500">
                                    아이템이 없습니다.
                                </p>
                            )}
                        </div>
                        {food1 && food2 && (
                            <div className="justify-center flex">
                                <Link
                                    href={`/compare?food1=${foodId1}&food2=${foodId2}`}
                                    className={`px-4 py-2 mt-4 rounded-xl bg-blue-500 text-white ${
                                        !food1 || !food2
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    }`}
                                    as={`/compare?food1=${foodId1}&food2=${foodId2}`}
                                >
                                    비교
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* 필터링 목록 시작 */}
            <div className="container mx-auto p-4 tracking-tighter">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex gap-4 mb-4 w-full md:w-1/2">
                        <BrandFilters
                            brands={brands}
                            onFilterChange={handleFilterChange}
                        />
                        <Sort type="dryFood" onSortChange={handleSortChange} />
                    </div>
                    <div className="flex flex-col gap-1 mb-4 border-opacity-70 rounded-2xl w-full md:w-2/5 lg:w-1/3 font-light ">
                        <span className="font-normal text-gray-300">검색</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            className="bg-transparent border-b border-white text-white p-2"
                        />
                    </div>
                </div>

                {/* 사료 시작*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredData?.length > 0 ? (
                        filteredData.map((food) => (
                            <ProductDetailCard
                                key={food.id}
                                food={food}
                                className={`bg-white text-black flex flex-col relative pb-12 hover:shadow-lime-200 hover:duration-1000`}
                                isList={true}
                            >
                                <div className="h-5/6 flex flex-col">
                                    <Link href={`/foods/${food.id}`}>
                                        <h2 className="text-xl md:text-xl font-semibold">
                                            {food.제품명}
                                        </h2>
                                    </Link>
                                    <span className="text-sm md:text-base text-gray-600">
                                        {food.브랜드}
                                    </span>
                                </div>
                                <div
                                    id="bottom"
                                    className="absolute bottom-4 left-0 right-0 flex justify-between items-end px-4" // absolute, bottom-4, left-0, right-0 추가
                                >
                                    <div className="text-sm">
                                        {(() => {
                                            switch (sort.split('-')[0]) {
                                                case '탄수화물':
                                                    return (
                                                        <>
                                                            <span className="text-gray-600">
                                                                탄수화물:{' '}
                                                                {(
                                                                    food.탄수화물 *
                                                                    100
                                                                ).toFixed(1)}
                                                                %
                                                            </span>
                                                        </>
                                                    )
                                                case '단백질':
                                                    return (
                                                        <>
                                                            <span className="text-gray-600">
                                                                단백질:{' '}
                                                                {(
                                                                    food.단백질 *
                                                                    100
                                                                ).toFixed(1)}
                                                                %
                                                            </span>
                                                        </>
                                                    )
                                                case '지방':
                                                    return (
                                                        <>
                                                            <span className="text-gray-600">
                                                                지방:{' '}
                                                                {(
                                                                    food.지방 *
                                                                    100
                                                                ).toFixed(1)}
                                                                %
                                                            </span>
                                                        </>
                                                    )
                                                case '100g당가격':
                                                    return (
                                                        <>
                                                            <span className="text-gray-600">
                                                                100g당 가격:{' '}
                                                                {food[
                                                                    '100g당가격'
                                                                ].toLocaleString(
                                                                    'ko-KR',
                                                                    {
                                                                        style: 'currency',
                                                                        currency:
                                                                            'KRW',
                                                                        minimumFractionDigits: 0,
                                                                    },
                                                                )}
                                                            </span>
                                                        </>
                                                    )
                                                case '열량':
                                                    return (
                                                        <>
                                                            <span className="text-gray-600">
                                                                열량:{' '}
                                                                {food['열량']}
                                                                kcal
                                                            </span>
                                                        </>
                                                    )
                                                default:
                                                    return null
                                            }
                                        })()}
                                    </div>
                                    <AddCart
                                        onClick={() => handleCompare(food)}
                                        className="border px-1 rounded-full w-10 h-10 md:w-16 md:h-16"
                                    >
                                        비교하기
                                    </AddCart>
                                </div>
                            </ProductDetailCard>
                        ))
                    ) : (
                        <div
                            id="empty"
                            className="col-span-full flex flex-col items-center justify-center min-h-[300px]"
                        >
                            <span className="text-2xl">
                                검색 결과가 없습니다.
                            </span>
                            <button className="px-4 py-2 mt-4 rounded-xl border">
                                <a
                                    href={`mailto:jahhyn@gmail.com?subject=${searchTerm} 제품 추가 요청`}
                                >
                                    {searchTerm ? `"${searchTerm}"` : ''} 제품
                                    추가 요청
                                </a>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

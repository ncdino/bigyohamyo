'use client'

import { useRouter } from 'next/navigation'
import { useState, use as usePromise, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import searchData from '@/app/data/wet_output.json'
import { motion } from 'framer-motion'
import ProductDetailCard from '@/components/Card/ProductDetailCard'
import GaugeChart from '@/components/Chart/CircleGaugeChart'
import WaterDropChart from '@/components/Chart/WaterDropChart'
import FeedPriceChart from '@/components/Chart/FeedPriceChart'
import InfoSVG from '@/components/svg/InfoSVG'
import WeightSVG from '@/components/svg/weightSVG'
import RatioSVG from '@/components/svg/RatioSVG'
import Menu from '@/components/Menu/MenuButton'

const calculateCaloriesPer100g = (kcal, grams) => {
    if (grams === 0 || isNaN(kcal) || isNaN(grams)) {
        return kcal
    } else {
        return (100 * kcal) / grams
    }
}

function ToggleButton({ isOn, toggleSwitch }) {
    const buttonText = isOn
        ? { left: 'LETTER', right: '' }
        : { left: '', right: 'GRAPH' }
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-10 tracking-tight">
            <button
                className={`relative flex items-center cursor-pointer w-40 md:w-64 h-15 md:h-24 p-2 rounded-full transition-colors duration-200 bg-pink-500 opacity-70 ${
                    isOn ? 'justify-end' : 'justify-start'
                }`}
                onClick={toggleSwitch}
            >
                <span className="absolute left-3 text-white px-1 text-sm md:text-lg">
                    {buttonText.left}
                </span>
                <motion.div
                    className="w-12 md:w-20 h-12 md:h-20 bg-[#C8F2EF] rounded-6xl"
                    layout
                    transition={{ type: 'spring', duration: 0.2, bounce: 0.2 }}
                />
                <span className="absolute right-3 text-white px-1 text-sm md:text-lg">
                    {buttonText.right}
                </span>
            </button>
        </div>
    )
}

function ProductTable({ food }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 overflow-clip">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
                {food.제품명}
            </h1>
            <div className="flex justify-end">
                <h1 className="text-sm md:text-2xl font-semibold mb-4 text-gray-800">
                    {food.브랜드}
                </h1>
            </div>
            <table className="w-full">
                <thead className="border-b-2 border-gray-200">
                    <tr>
                        <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">
                            항목
                        </th>
                        <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">
                            값
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(food).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-200">
                            <td className="text-base md:text-lg text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                {key.replace(/_/g, ' ')}
                            </td>
                            <td className="text-base md:text-lg text-gray-900 font-light px-4 py-4 whitespace-normal">
                                {typeof value === 'number'
                                    ? value.toLocaleString('ko-KR')
                                    : value || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default function WetFoodDetail({ params: paramsPromise }) {
    const params = usePromise(paramsPromise)
    const { id } = params
    const router = useRouter()
    const [isOn, setIsOn] = useState(true)
    const toggleSwitch = () => setIsOn(!isOn)
    const [capSize, setCapSize] = useState(200)
    const [svgSize, setSvgSize] = useState(90)
    const [nutSize, setNutSize] = useState(70)
    const [feedSize, setFeedSize] = useState(50)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 375) {
                setCapSize(32) // sm breakpoint
                setSvgSize(80)
                setNutSize(70)
            } else if (width < 768) {
                setCapSize(32) // md breakpoint
                setSvgSize(200)
                setNutSize(80)
            } else if (width < 1200) {
                setCapSize(32) // lg breakpoint
                setSvgSize(200)
                setNutSize(180)
            } else {
                setCapSize(60) // default size for larger screens
                setSvgSize(200)
                setNutSize(180)
            }
        }

        handleResize() // 초기 사이즈 설정
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Query to fetch a single product by ID
    const {
        data: food,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['wetFood', id],
        queryFn: () =>
            Promise.resolve(searchData.find((item) => String(item.id) === id)),
        staleTime: 60 * 60 * 1000,
    })

    if (isLoading) return <div></div>
    if (isError || !food) return <div>사료 정보를 찾을 수 없습니다.</div>

    const GoBackButton = ({ onClick }) => {
        return (
            <button
                className="text-white fixed top-2 right-4 md:top-4 md:right-8"
                onClick={onClick}
            >
                <div className="inline-flex gap-0.5 text-center">
                    <svg
                        fill="#ffffff"
                        width="60px"
                        height="60px"
                        viewBox="0 0 32 32"
                        data-name="Layer 2"
                        id="Layer_2"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 md:w-16 md:h-16"
                    >
                        <title />
                        <path d="M11.17,10.23a33.37,33.37,0,0,0-3.05,3.13c-.51.62-1.28,1.3-1.21,2.17s.81,1.24,1.35,1.76a16.3,16.3,0,0,1,2.57,3.17c.86,1.36,3,.11,2.16-1.26a21.06,21.06,0,0,0-1.82-2.48A16.16,16.16,0,0,0,10,15.52c-.22-.21-.86-1.14-.68-.49l-.13,1a17.85,17.85,0,0,1,3.72-4c1.19-1.08-.58-2.85-1.77-1.76Z" />
                        <path d="M9.4,17a109.13,109.13,0,0,0,12.53-.1c1.59-.11,1.61-2.61,0-2.5a109.13,109.13,0,0,1-12.53.1c-1.61-.07-1.6,2.43,0,2.5Z" />
                    </svg>
                </div>
            </button>
        )
    }

    function handleClick() {
        router.back()
    }

    return (
        <div className="font-paperlogy bg-gradient-to-r from-[#f4c4f3] to-[#fc67fa] min-h-screen items-center relative tracking-tighter">
            <div className="p-2">
                <Menu />
            </div>
            <GoBackButton onClick={handleClick} />
            <div className="flex flex-col justify-center items-center tracking-tighter py-20">
                <div className="container mt-5">
                    {isOn ? (
                        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                                <div className="flex flex-col gap-4 md:gap-8 md:col-span-1">
                                    <div className="grid grid-cols-4 md:col-span-4 gap-4 md:gap-8">
                                        <ProductDetailCard className="col-span-3">
                                            <div>
                                                <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-800">
                                                    {food.제품명}
                                                </h1>
                                                <h2 className="text-base lg:text-xl font-semibold text-gray-500">
                                                    {food.브랜드}
                                                </h2>
                                            </div>
                                        </ProductDetailCard>
                                        <ProductDetailCard className="col-span-1">
                                            <div className="flex justify-center text-center">
                                                <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800">
                                                    {food.구분}
                                                </span>
                                            </div>
                                        </ProductDetailCard>
                                    </div>
                                    <div className="grid grid-cols-4 md:grid-cols-2 gap-4 md:gap-8">
                                        <ProductDetailCard className="col-span-2 md:col-span-1">
                                            <div className="flex justify-between">
                                                <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                                    제형
                                                </h1>
                                                <InfoSVG label="습식 사료의 형태나 질감" />
                                            </div>
                                            <div className="text-center mt-0 lg:mt-4 text-4xl font-light">
                                                <p className="text-2xl lg:text-4xl py-0 lg:py-2 font-extrabold">
                                                    {food.타입}
                                                </p>
                                            </div>
                                        </ProductDetailCard>
                                        <ProductDetailCard className="col-span-2 md:col-span-1">
                                            <div className="flex justify-between">
                                                <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                                    포장
                                                </h1>
                                                <InfoSVG label="습식 사료를 담고 있는 용기나 포장재" />
                                            </div>
                                            <div className="text-center mt-0 lg:mt-4 text-4xl font-light">
                                                <p className="text-2xl lg:text-4xl py-0 lg:py-2 font-extrabold">
                                                    {food.포장}
                                                </p>
                                            </div>
                                        </ProductDetailCard>
                                    </div>
                                </div>
                                <div className="md:col-span-1">
                                    <ProductDetailCard className="col-span-4">
                                        <InfoSVG label="건조된 상태에서의 함량" />
                                        <div className="flex flex-row p-2 gap-4 md:gap-6 lg:gap-8 w-10 justify-center mx-auto">
                                            {[
                                                {
                                                    label: '조단백',
                                                    value: food['조단백(DM)'],
                                                    color: '#85A389',
                                                    maxValue: 100,
                                                },
                                                {
                                                    label: '조지방',
                                                    value: food['조지방(DM)'],
                                                    color: '#A2CDB0',
                                                    maxValue: 100,
                                                },

                                                {
                                                    label: '나트륨',
                                                    value: food['나트륨(DM)'],
                                                    color: '#FFD89C',
                                                    maxValue: 1.4,
                                                },
                                            ].map((item, index) => (
                                                <div key={index}>
                                                    <GaugeChart
                                                        value={item.value}
                                                        color={item.color}
                                                        animated={true}
                                                        className="w-50 h-50 md:w-100 md:h-100 lg:w-200 lg:h-200"
                                                        size={nutSize}
                                                        maxValue={item.maxValue}
                                                    />
                                                    <div className="text-center mt-4 text-xl md:text-2xl lg:text-4xl font-extrabold">
                                                        <p className="font-light text-xl md:text-2xl lg:text-3xl mb-0.5">
                                                            {item.label}
                                                        </p>
                                                        <p className="">
                                                            {item.value.toFixed(
                                                                1,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ProductDetailCard>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 lg:gap-8">
                                <ProductDetailCard className="col-span-2">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                            수분
                                        </h1>
                                        <InfoSVG label="건강한 신장과 비뇨기계 유지" />
                                    </div>
                                    <div className="flex justify-center items-center mt-0 lg:mt-2">
                                        <WaterDropChart
                                            value={food.수분}
                                            maxValue={120}
                                            size={svgSize}
                                            fillColor="#72AEFD"
                                            strokeColor="#72AEFD"
                                            className="size-48"
                                        />
                                    </div>
                                    <div className="text-center mt-0 lg:mt-4 text-4xl font-light">
                                        <p className="text-2xl md:text-3xl lg:text-4xl py-0 lg:py-2 font-extrabold">
                                            {food.수분}
                                        </p>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard className="col-span-2">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                            칼로리
                                        </h1>
                                        <InfoSVG label="100g당 칼로리" />
                                    </div>
                                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 items-center justify-center">
                                        <FeedPriceChart
                                            value={calculateCaloriesPer100g(
                                                food.Kcal,
                                                food.g,
                                            )}
                                            maxValue={300}
                                            size={120}
                                            color="#85A389"
                                            className="mt-4 size-32 lg:size-48"
                                        />
                                        <div className="text-center text-2xl md:text-3xl lg:text-4xl font-light mt-2 lg:mt-0">
                                            <p className="py-2 font-extrabold inline-flex gap-1">
                                                {calculateCaloriesPer100g(
                                                    food.Kcal,
                                                    food.g,
                                                ).toFixed(1)}
                                                <span className="font-light text-xl">
                                                    kcal
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard className="col-span-2">
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-2 lg:mb-6">
                                        무게
                                    </h1>
                                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 items-center justify-center">
                                        <WeightSVG className="size-32 lg:size-48 mt-4" />
                                        <div className="text-center text-2xl lg:text-4xl font-light mt-2 lg:mt-0">
                                            <p className="py-2 font-extrabold inline-flex gap-1">
                                                {food['g']}
                                                <span className="font-light text-xl">
                                                    g
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard className="col-span-2">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                            Ca:P
                                        </h1>
                                        <InfoSVG label="[칼륨:인] 비율이 적절하지 않으면 다양한 건강 문제를 야기" />
                                    </div>
                                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 items-center justify-center">
                                        <RatioSVG className="size-32 lg:size-48 mt-4" />
                                        <div className="text-center text-2xl lg:text-4xl font-light mt-2 lg:mt-0">
                                            <span className="py-2 font-extrabold inline-flex gap-1">
                                                {food['칼슘:인']}
                                            </span>
                                        </div>
                                    </div>
                                </ProductDetailCard>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                <ProductDetailCard className="col-span-1">
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-2 lg:mb-6">
                                        제1원료
                                    </h1>
                                    <div className="text-2xl lg:text-4xl py-0.5 lg:py-2 font-light text-center">
                                        <span>{food.제1원료}</span>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard className="col-span-1">
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-2 lg:mb-6">
                                        제2원료
                                    </h1>
                                    <div className="text-2xl lg:text-4xl py-0.5 lg:py-2 font-light text-center">
                                        <span>{food.제2원료}</span>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard className="col-span-1">
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-2 lg:mb-6">
                                        제3원료
                                    </h1>
                                    <div className="text-2xl lg:text-4xl py-0.5 lg:py-2 font-light text-center">
                                        <span>{food.제3원료}</span>
                                    </div>
                                </ProductDetailCard>
                            </div>
                        </div>
                    ) : (
                        <ProductTable food={food} />
                    )}
                    <ToggleButton isOn={isOn} toggleSwitch={toggleSwitch} />
                </div>
            </div>
        </div>
    )
}

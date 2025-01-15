'use client'

import searchData from '@/app/data/food.json'
import GaugeChart from '@/components/Chart/CircleGaugeChart'
import ProductDetailCard from '@/components/Card/ProductDetailCard'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { use as usePromise } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import cranberryImg from '@/app/assets/cranberry.png'
import yaccaImg from '@/app/assets/yacca.svg'
import stomachImg from '@/app/assets/bacteria.svg'
import grainfreeImg from '@/app/assets/grain-free.svg'
import glutenfreeImg from '@/app/assets/gluten-free.svg'
import FeedPriceChart from '@/components/Chart/FeedPriceChart'
import { twMerge } from 'tailwind-merge'
import { BarRatioChart } from '@/components/Chart/BarRatioChart'
import WaterDropChart from '@/components/Chart/WaterDropChart'
import FiberGaugeChart from '@/components/Chart/FiberGaugeChart'
import AshGaugeChart from '@/components/Chart/AshGaugeChart'
import MoneyGaugeChart from '@/components/Chart/MoneyGaugeChart'
import { redirect, useRouter } from 'next/navigation'
import Menu from '@/components/Menu/MenuButton'

function ToggleButton({ isOn, toggleSwitch }) {
    const buttonText = isOn
        ? { left: 'LETTER', right: '' }
        : { left: '', right: 'GRAPH' }

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-10 tracking-tight">
            <button
                className={`relative flex items-center cursor-pointer w-40 md:w-64 h-15 md:h-24 p-2 rounded-full transition-colors duration-200 bg-[#BB6464] opacity-70 ${
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

function ProductTable({ food, isOn }) {
    const changedData = isOn
        ? {
              ...food,
              탄수화물: food.탄수화물 * 1.1,
              단백질: food.단백질 * 0.9,
          }
        : food

    return (
        <div className="bg-white rounded-lg shadow-md p-6 overflow-clip">
            <div className="container"></div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
                {food.제품명}
            </h1>
            <div className="flex justify-end">
                <h1 className="text-sm md:text-2xl font-semibold mb-4 text-gray-800">
                    {food.제조사}
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
                    {[
                        '수입사',
                        '탄수화물',
                        '단백질',
                        '지방',
                        '조섬유',
                        '조회분',
                        '수분',
                        '칼슘',
                        '인',
                        '무게(kg)',
                        '열량',
                        '장유익균',
                        '크랜베리',
                        '유카추출물',
                        '밀프리',
                        '그레인프리',
                        '사용된유지류',
                        '제1원료',
                        '제2원료',
                        '제3원료',
                    ].map((key, index) => (
                        <tr
                            key={`${food.id}-${key}`}
                            className="border-b border-gray-200"
                        >
                            <td className="text-base md:text-lg text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                {key.replace(/_/g, ' ')}
                            </td>
                            <td className="text-base md:text-lg text-gray-900 font-light px-4 py-4 whitespace-normal">
                                {typeof changedData[key] === 'number'
                                    ? changedData[key].toLocaleString('ko-KR')
                                    : changedData[key] || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

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

export default function FoodDetail({ params: paramsPromise }) {
    const params = usePromise(paramsPromise)
    const { id } = params

    const router = useRouter()

    const [isOn, setIsOn] = useState(true)
    const toggleSwitch = () => setIsOn(!isOn)
    const [capSize, setCapSize] = useState(200)
    const [svgSize, setSvgSize] = useState(90)
    const [nutSize, setNutSize] = useState(70)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 375) {
                setCapSize(32) // sm
                setSvgSize(90)
                setNutSize(70)
            } else if (width < 768) {
                setCapSize(32) // md
                setSvgSize(200)
                setNutSize(100)
            } else if (width < 1200) {
                setCapSize(32) // lg
                setSvgSize(200)
                setNutSize(200)
            } else {
                setCapSize(60)
                setSvgSize(200)
                setNutSize(200)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const {
        data: food,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['dryFood', id],
        queryFn: () =>
            Promise.resolve(searchData.find((item) => String(item.id) === id)),
        staleTime: 60 * 60 * 1000,
    })

    if (isLoading) return <div></div>
    if (isError || !food) return <div>사료 정보를 찾을 수 없습니다.</div>

    function handleClick() {
        router.back()
    }

    return (
        <div className="font-paperlogy bg-gradient-to-r from-[#f857a6] to-[#ff5858] min-h-screen items-center relative tracking-tighter">
            <div className="p-2">
                <Menu />
            </div>
            <GoBackButton onClick={handleClick} />
            <div className="container flex flex-col justify-center mt-5 py-20">
                {isOn ? (
                    <>
                        <div className="grid grid-col lg:grid-cols-3 gap-8">
                            <div id="maingrid1" className="col-span-1">
                                <ProductDetailCard>
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-800">
                                            {food.제품명}
                                        </h1>
                                        <h2 className="text-xl lg:text-2xl font-semibold text-gray-500">
                                            {food.브랜드}
                                        </h2>
                                    </div>
                                </ProductDetailCard>
                            </div>
                            <div id="maingrid2" className="col-span-2">
                                <ProductDetailCard>
                                    <div className="flex flex-row gap-6 p-2 md:gap-8 w-10 justify-center mx-auto">
                                        {[
                                            {
                                                label: '탄수화물',
                                                value: food.C,
                                                color: '#85A389',
                                                maxValue: 100,
                                            },
                                            {
                                                label: '단백질',
                                                value: food.P,
                                                color: '#A2CDB0',
                                                maxValue: 100,
                                            },
                                            {
                                                label: '지방',
                                                value: food.F,
                                                color: '#FFD89C',
                                                maxValue: 100,
                                            },
                                        ].map((item, index) => (
                                            <div key={index}>
                                                <GaugeChart
                                                    value={item.value * 100}
                                                    color={item.color}
                                                    animated={true}
                                                    className="w-50 h-50 lg:w-200 lg:h-200"
                                                    size={nutSize}
                                                    maxValue={item.maxValue}
                                                />
                                                <div className="text-center mt-4 text-xl md:text-2xl lg:text-4xl font-extrabold">
                                                    <p className="font-light text-xl md:text-2xl lg:text-3xl mb-0.5">
                                                        {item.label}
                                                    </p>
                                                    <p className="">
                                                        {(
                                                            item.value * 100
                                                        ).toFixed(1)}
                                                        %
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ProductDetailCard>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-6 lg:gap-8">
                            <div
                                id="grid1"
                                className="grid grid-cols-2 gap-6 lg:gap-8"
                            >
                                <ProductDetailCard>
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                        조섬유
                                    </h1>
                                    <div className="flex justify-center items-center mt-0 lg:mt-2">
                                        <FiberGaugeChart
                                            value={food.조섬유 * 100}
                                            maxValue={10}
                                            size={svgSize}
                                        />
                                    </div>
                                    <div className="text-center mt-0 lg:mt-4 text-4xl font-light">
                                        <p className="text-2xl lg:text-4xl py-0 lg:py-2 font-extrabold">
                                            {(food.조섬유 * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard>
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                        수분
                                    </h1>
                                    <div className="flex justify-center items-center mt-0 lg:mt-2">
                                        <WaterDropChart
                                            value={food.수분}
                                            maxValue={0.2}
                                            size={svgSize}
                                            fillColor="#72AEFD"
                                            strokeColor="#72AEFD"
                                        />
                                    </div>
                                    <div className="text-center mt-0 lg:mt-4 text-4xl font-light">
                                        <p className="text-2xl lg:text-4xl py-0 lg:py-2 font-extrabold">
                                            {(food.수분 * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard>
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                        조회분
                                    </h1>
                                    <div className="flex justify-center items-center mt-0 lg:mt-2">
                                        <AshGaugeChart
                                            value={food.조회분 * 100}
                                            maxValue={22}
                                            size={svgSize}
                                        />
                                    </div>
                                    <div className="text-center mt-0 lg:mt-4 text-4xl font-light">
                                        <p className="text-2xl lg:text-4xl py-0 lg:py-2 font-extrabold">
                                            {(food.조회분 * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard>
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-0 lg:mb-10">
                                        가격
                                    </h1>
                                    <div className="flex justify-center items-center mt-0 lg:mt-2">
                                        <MoneyGaugeChart
                                            value={food['100g당가격']}
                                            maxValue={4000}
                                            size={svgSize}
                                        />
                                    </div>
                                    <div className="text-center mt-0 lg:mt-4 text-4xl font-light">
                                        <p className="text-xl lg:text-3xl">
                                            100G 당
                                        </p>
                                        <p className="text-2xl lg:text-4xl py-0 lg:py-2 font-extrabold">
                                            {food['100g당가격'].toLocaleString(
                                                'ko-KR',
                                                {
                                                    style: 'currency',
                                                    currency: 'KRW',
                                                    minimumFractionDigits: 0,
                                                },
                                            )}
                                        </p>
                                    </div>
                                </ProductDetailCard>
                            </div>
                            <div
                                id="grid2"
                                className="flex flex-col gap-6 lg:gap-8"
                            >
                                <ProductDetailCard>
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-2 lg:mb-6">
                                        칼로리
                                    </h1>
                                    <div className="flex gap-8 items-center justify-center">
                                        <FeedPriceChart
                                            value={food['열량']}
                                            maxValue={5600}
                                            size={180}
                                            color="#85A389"
                                        />
                                        <div className="text-center mt-4 text-2xl lg:text-4xl font-light">
                                            <p>1KG당</p>
                                            <p className="text-4xl py-2 font-extrabold">
                                                {food.열량}
                                            </p>
                                            <p>kcal.</p>
                                        </div>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard>
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">
                                        Ca:P RATIO
                                    </h1>
                                    <div className="flex justify-center items-center">
                                        <BarRatioChart
                                            component1={food.칼슘 * 100}
                                            component2={food.인 * 100}
                                            component1Label="칼슘"
                                            component2Label="인"
                                            size={capSize}
                                        />
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard>
                                    <h1 className="text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">
                                        추가성분
                                    </h1>
                                    <div className="flex flex-row justify-between items-center px-2 md:px-0 lg:px-16">
                                        <div
                                            className={twMerge(
                                                'flex flex-col gap-1 items-center',
                                                food.크랜베리 ? '' : 'hidden',
                                            )}
                                        >
                                            <Image
                                                src={cranberryImg}
                                                alt="cranberry"
                                                className="size-16"
                                            />
                                            <p>크랜베리</p>
                                        </div>
                                        <div
                                            className={twMerge(
                                                'flex gap-1 flex-col items-center',
                                                food.장유익균 ? '' : 'hidden',
                                            )}
                                        >
                                            <Image
                                                src={stomachImg}
                                                alt="bacteria"
                                                className="size-16"
                                            />
                                            <p>장유익균</p>
                                        </div>
                                        <div
                                            className={twMerge(
                                                'flex gap-1 flex-col items-center',
                                                food.유카추출물 ? '' : 'hidden',
                                            )}
                                        >
                                            <Image
                                                src={yaccaImg}
                                                alt="yacca"
                                                className="size-16"
                                            />
                                            <p>유카추출물</p>
                                        </div>
                                        <div
                                            className={twMerge(
                                                'flex gap-1 flex-col items-center',
                                                food.밀프리 ? '' : 'hidden',
                                            )}
                                        >
                                            <Image
                                                src={glutenfreeImg}
                                                alt="gluten-free"
                                                className="size-16"
                                            />
                                            <p>밀프리</p>
                                        </div>
                                        <div
                                            className={twMerge(
                                                'flex gap-1 flex-col items-center',
                                                food.그레인프리 ? '' : 'hidden',
                                            )}
                                        >
                                            <Image
                                                src={grainfreeImg}
                                                alt="grain-free"
                                                className="size-16"
                                            />
                                            <p>그레인프리</p>
                                        </div>
                                    </div>
                                </ProductDetailCard>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-8">
                            <ProductDetailCard>
                                <h1 className="text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">
                                    제1원료
                                </h1>
                                <div className="text-2xl lg:text-4xl py-0.5 lg:py-2 font-light text-center">
                                    <span>{food.제1원료}</span>
                                </div>
                            </ProductDetailCard>
                            <ProductDetailCard>
                                <h1 className="text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">
                                    제2원료
                                </h1>
                                <div className="text-2xl lg:text-4xl py-0.5 lg:py-2 font-light text-center">
                                    <span>{food.제2원료}</span>
                                </div>
                            </ProductDetailCard>
                            <ProductDetailCard>
                                <h1 className="text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">
                                    제3원료
                                </h1>
                                <div className="text-2xl lg:text-4xl py-0.5 lg:py-2 font-light text-center">
                                    <span>{food.제3원료}</span>
                                </div>
                            </ProductDetailCard>
                        </div>
                    </>
                ) : (
                    <ProductDetailCard>
                        <ProductTable food={food} isOn={isOn} />
                    </ProductDetailCard>
                )}
            </div>
            <ToggleButton isOn={isOn} toggleSwitch={toggleSwitch} />
        </div>
    )
}

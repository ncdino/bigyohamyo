'use client'

import searchData from '@/app/data/food.json'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductDetailCard from '@/components/Card/ProductDetailCard'
import UpArrow from '@/components/svg/UpArrow'
import MoneyGaugeChart from '@/components/Chart/MoneyGaugeChart'
import FeedPriceChart from '@/components/Chart/FeedPriceChart'
import Menu from '@/components/Menu/MenuButton'

function CalorieDifference(foodA, foodB) {
    if (foodA > foodB) {
        const difference = foodA - foodB
        const percentageDifference = (difference / foodB) * 100
        return percentageDifference
    } else if (foodA < foodB) {
        const difference = foodB - foodA
        const percentageDifference = (difference / foodA) * 100
        return percentageDifference
    } else {
        return <div>Error</div>
    }
}

function ToggleButton({ isOn, toggleSwitch }) {
    const buttonText = isOn
        ? { left: 'LETTER', right: '' }
        : { left: '', right: 'GRAPH' }
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-10 tracking-tight">
            <button
                className={`relative flex items-center cursor-pointer w-40 md:w-64 h-15 md:h-24 p-2 rounded-full transition-colors duration-200 bg-blue-800 opacity-70 ${
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

function CompareTable({ product1, product2, isOn }) {
    const adjustData = (data) =>
        isOn
            ? {
                  ...data,
                  탄수화물: data.탄수화물 * 1.1,
                  단백질: data.단백질 * 0.9,
              }
            : data

    const changedData1 = adjustData(product1)
    const changedData2 = adjustData(product2)

    const compareKeys = [
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
    ]

    return (
        <div className="bg-white rounded-lg shadow-md p-2 lg:p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">제품 비교</h1>
            <table className="w-full">
                <thead className="border-b-2 border-gray-200">
                    <tr>
                        <th className="text-left text-sm font-medium text-gray-600 px-2 lg:px-4 py-1 lg:py-3">
                            항목
                        </th>
                        <th className="text-left text-sm font-bold text-gray-600 px-2 lg:px-4 py-1 lg:py-3">
                            {product1.제품명}
                        </th>
                        <th className="text-left text-sm font-bold text-gray-600 px-2 lg:px-4 py-1 lg:py-3">
                            {product2.제품명}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {compareKeys.map((key) => (
                        <tr key={key} className="border-b border-gray-200">
                            <td className="text-sm lg:text-lg text-gray-900 font-light px-2 lg:px-4 py-2 lg:py-4 whitespace-nowrap">
                                {key.replace(/_/g, ' ')}
                            </td>
                            <td className="text-sm lg:text-lg text-gray-900 font-light px-2 lg:px-4 py-2 lg:py-4 whitespace-normal">
                                {typeof changedData1[key] === 'number'
                                    ? changedData1[key].toLocaleString('ko-KR')
                                    : changedData1[key] || '-'}
                            </td>
                            <td className="text-sm lg:text-lg text-gray-900 font-light px-2 lg:px-4 py-2 lg:py-4 whitespace-noramal">
                                {typeof changedData2[key] === 'number'
                                    ? changedData2[key].toLocaleString('ko-KR')
                                    : changedData2[key] || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function CompareItemA(foodA, foodB, item) {
    const itemA = parseFloat(foodA[item])
    const itemB = parseFloat(foodB[item])

    if (isNaN(itemA) || isNaN(itemB)) {
        return '데이터가 유효하지 않습니다.'
    }

    const diff = (itemA - itemB).toFixed(3)
    const isGreater = itemA > itemB
    const isLesser = itemA < itemB

    const getCardContent = (color, arrowColor) => (
        <ProductDetailCard
            className={`text-xl md:text-2xl lg:text-3xl tracking-tighter`}
        >
            <h1
                className={`flex justify-start text-center font-base text-gray-500`}
            >
                {item}
            </h1>
            <div className="flex flex-col justify-center items-center">
                <p
                    className={`font-extrabold text-center inline-flex text-4xl md:text-5xl lg:text-6xl mt-1 md:mt-2 text-${color}-500`}
                >
                    {(Math.abs(diff) * 100).toFixed(1)}%
                    {/* <sup>
                        <UpArrow height="22" width="18" color={arrowColor} />
                    </sup> */}
                </p>
            </div>
            <p
                className={`flex justify-end font-semibold text-center text-xl md:text-2xl lg:text-3xl mt-1 md:mt-2 text-gray-500`}
            >
                더 높아요
            </p>
        </ProductDetailCard>
    )

    if (isGreater) {
        return getCardContent('red', '#ef4444')
    } else if (isLesser) {
        return getCardContent('blue', '#3b82f6')
    } else {
        return (
            <ProductDetailCard className="bg-gradient-to-br from-[#00416A] to-[#E4E5E6] text-gray-100 font-extralight text-xl md:text-2xl lg:text-3xl text-center tracking-tighter">
                <p>두 제품의</p>
                <p className="text-gray-300 font-extrabold text-2xl md:text-3xl lg:text-4xl">
                    {item}
                </p>
                <p>값이 같습니다.</p>
            </ProductDetailCard>
        )
    }
}

export default function Compare() {
    const searchParams = useSearchParams()
    const food1 = searchParams.get('food1')
    const food2 = searchParams.get('food2')
    const router = useRouter()

    const foodA = searchData.find((item) => String(item.id) === food1)
    const foodB = searchData.find((item) => String(item.id) === food2)

    if (!foodA || !foodB) {
        return (
            <div className="p-4">
                <p className="text-red-500">
                    선택한 사료 정보를 찾을 수 없습니다.
                </p>
                <Link href={'/'}>
                    <p className="underline mt-2">돌아가기</p>
                </Link>
            </div>
        )
    }

    const [isOn, setIsOn] = useState(true)
    const toggleSwitch = () => setIsOn(!isOn)

    const calComparison = CalorieDifference(foodA.열량, foodB.열량).toFixed(1)

    function handleClick() {
        router.back()
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

    return (
        <div className="bg-gradient-to-r from-[#000046] to-[#1CB5E0] min-h-screen font-paperlogy">
            <div className="p-2">
                <Menu />
            </div>
            <GoBackButton onClick={handleClick} />
            <div className="container py-14 lg:py-28">
                {isOn ? (
                    <div className="gap-4 md:gap-6 lg:gap-8">
                        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 grid-rows-[1fr]">
                            <div className="text-center col-span-1">
                                <ProductDetailCard className="text-red-900 bg-red-500 h-full">
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
                                        <Link href={`/foods/${foodA.id}`}>
                                            {foodA.제품명}
                                        </Link>
                                    </h1>
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold py-2 md:py-3 lg:py-5">
                                        {foodA.브랜드}
                                    </h2>
                                </ProductDetailCard>
                            </div>
                            <div className="text-center col-span-1">
                                <ProductDetailCard className="bg-blue-500 text-blue-900 text-center h-full">
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
                                        <Link href={`/foods/${foodB.id}`}>
                                            {foodB.제품명}
                                        </Link>
                                    </h1>
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold py-2 md:py-3 lg:py-5">
                                        {foodB.브랜드}
                                    </h2>
                                </ProductDetailCard>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-8">
                            <div className="grid col-span-4 md:col-span-2 grid-cols-2 gap-4 md:gap-8 justify-center items-center">
                                {CompareItemA(foodA, foodB, '탄수화물')}
                                {CompareItemA(foodA, foodB, '단백질')}
                                {CompareItemA(foodA, foodB, '지방')}
                                {CompareItemA(foodA, foodB, '조섬유')}
                                {CompareItemA(foodA, foodB, '조회분')}
                                {CompareItemA(foodA, foodB, '수분')}
                            </div>
                            <div className="flex flex-col gap-8 col-span-4 md:col-span-2">
                                <ProductDetailCard className="tracking-tighter">
                                    <div className="grid md:grid-cols-4">
                                        <div className="flex flex-col justify-center items-center md:col-span-2">
                                            <MoneyGaugeChart
                                                value={
                                                    foodA['100g당가격'] -
                                                    foodB['100g당가격']
                                                }
                                                maxValue={100}
                                                size={200}
                                            />
                                            {/* <p className="text-2xl text-center font-light text-gray-800">
                                                {Math.abs(
                                                    foodA['100g당가격'] -
                                                        foodB['100g당가격'],
                                                ).toFixed(0)}
                                                원
                                            </p> */}
                                        </div>
                                        <div className="flex flex-col justify-center items-center md:col-span-2">
                                            <p className="font-light text-2xl md:text-3xl lg:text-4xl">
                                                100G 당,
                                            </p>
                                            <div className="justify-center items-center text-4xl lg:text-5xl mt-2 lg:mt-5 text-center font-extrabold gap-8 inline-flex">
                                                <p className="text-red-500">
                                                    {foodA[
                                                        '100g당가격'
                                                    ].toFixed(0)}
                                                    원
                                                </p>
                                                <p className="text-blue-500">
                                                    {foodB[
                                                        '100g당가격'
                                                    ].toFixed(0)}
                                                    원
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ProductDetailCard>
                                <ProductDetailCard>
                                    <div className="grid grid-cols-1 md:grid-cols-4 justify-between items-center gap-4">
                                        <div className="flex flex-col md:col-span-2 justify-center items-center">
                                            <FeedPriceChart
                                                value={calComparison}
                                                maxValue={10}
                                                size={150}
                                            />

                                            {/* <div className="flex justify-center text-2xl">
                                                {calComparison} %
                                            </div> */}
                                        </div>
                                        <div className="md:col-span-2 flex justify-center text-center gap-8">
                                            <div>
                                                <p className="font-extrabold text-red-500 text-4xl lg:text-5xl">
                                                    {foodA.열량}
                                                </p>
                                                <p className="text-4xl font-extralight text-gray-800">
                                                    kcal.
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-blue-500 text-4xl lg:text-5xl">
                                                    {foodB.열량}
                                                </p>
                                                <p className="text-4xl font-extralight text-gray-800">
                                                    kcal.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ProductDetailCard>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <ProductDetailCard className="overflow-x-auto">
                            <CompareTable
                                product1={foodA}
                                product2={foodB}
                                isOn={false}
                            />
                        </ProductDetailCard>
                    </>
                )}

                <ToggleButton isOn={isOn} toggleSwitch={toggleSwitch} />
            </div>
        </div>
    )
}

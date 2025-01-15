'use client'

import { useScroll, motion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const text = `이제 '비교하묘'에서 객관적인 데이터를 바탕으로 우리 고양이에게 정말 필요한 사료를 선택하세요. 영양 성분, 원료 등 다양한 정보를 비교하여, 건강한 냥이 생활을 지원합니다.`
const words = text.split(' ')

export default function Introduction() {
    const scrollTarget = useRef(null)
    const { scrollYProgress } = useScroll({
        target: scrollTarget,
        offset: ['start end', 'end end'],
    })
    const [currentWord, setCurrentWord] = useState(0)
    const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length])

    useEffect(() => {
        wordIndex.on('change', (latest) => {
            setCurrentWord(latest)
        })
    }, [wordIndex])

    return (
        <section
            id="introdution"
            className="min-h-screen py-20 lg:py-16 font-paperlogy "
        >
            <div className="container mx-auto px-10 h-full flex flex-col justify-center items-center">
                <div className="sticky top-20 md:top-28 lg:top-40">
                    <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10 leading-relaxed">
                        <span className="text-8xl block leading-[1.2] font-bold">
                            광고만 보고 사료를 선택하셨나요?
                        </span>
                        <span className="text-white/15 block leading-[1.7] md:leading-[1.9] lg:leading-tight">
                            {words.map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className={twMerge(
                                        'transition duration-500',
                                        wordIndex < currentWord &&
                                            'bg-gradient-to-tr from-purple-400 to-pink-400 bg-clip-text',
                                    )}
                                >{`${word} `}</span>
                            ))}
                        </span>
                        <span className="text-lime-400 block leading-[2.0] text-8xl font-extrabold">
                            시작해볼까요?
                        </span>
                    </div>
                </div>
                <div className="h-[150vh]" ref={scrollTarget}></div>
            </div>
        </section>
    )
}

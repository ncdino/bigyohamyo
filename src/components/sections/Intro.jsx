'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '../Card/Card'
import { twMerge } from 'tailwind-merge'

const introdution = [
    {
        id: 1,
        title: `이제 '비교하묘'에서 객관적인 데이터를 바탕으로 우리 고양이에게 정말 필요한 사료를 선택하세요. 영양 성분, 원료 등 다양한 정보를 비교하여, 건강한 냥이 생활을 지원합니다.`,
        svg: 'd',
    },
    {
        id: 2,
        title: `이제 '비교하묘'에서 객관적인 데이터를 바탕으로 우리 고양이에게 정말 필요한 사료를 선택하세요. 영양 성분, 원료 등 다양한 정보를 비교하여, 건강한 냥이 생활을 지원합니다.`,
    },
    {
        id: 3,
        title: `준비되셨나요?`,
    },
]

export default function Intro() {
    const [visibleIndexes, setVisibleIndexes] = useState([])

    const cardRefs = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.dataset.index)
                    if (entry.isIntersecting) {
                        setVisibleIndexes((prev) => [
                            ...new Set([...prev, index]),
                        ])
                    } else {
                        setVisibleIndexes((prev) =>
                            prev.filter((i) => i !== index),
                        )
                    }
                })
            },
            { threshold: 0.1 },
        )

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => {
            cardRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref)
            })
        }
    }, [])

    return (
        <section id="introduce">
            <div className="">
                {introdution.map((item, itemIndex) => (
                    <Card
                        key={item.id}
                        ref={(el) => (cardRefs.current[itemIndex] = el)}
                        data-index={itemIndex}
                        className={twMerge(
                            'px-8 pt-8 pb-0 md:pt-12 lg:pt-16 lg:px-20 md:px-10 sticky',
                            itemIndex % 2 === 0 ? 'bg-primary' : 'bg-black',
                            visibleIndexes.includes(itemIndex)
                                ? 'opacity-100 translate-y-0 transition duration-500 ease-in-out'
                                : 'opacity-0 translate-y-10',
                        )}
                        style={{
                            top: `calc(64px + ${itemIndex * 20}px)`,
                        }}
                    >
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center lg:pb-16 text-white text-5xl">
                                <span id="content">{item?.title}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

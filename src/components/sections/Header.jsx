'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'
import TextWithVideo from '../Video/VideoTextMask'
import HeaderProductSearch from './ProductDetail'

export default function Header() {
    const router = useRouter()

    const commentRef = useRef(null)
    const isInView = useInView(commentRef, { once: true })

    const navItems = [
        { href: '/', label: 'HOME' },
        { href: '/drylist', label: 'DRY FEEDS' },
        { href: '/wetlist', label: 'WET FEEDS' },
    ]

    const handleClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const targetId = href.substring(1)
            const targetElement = document.getElementById(targetId)
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        } else {
            router.push(href)
        }
    }

    return (
        <header>
            <div
                id="nav"
                className="container font-paperlogy tracking-tighter min-h-screen"
            >
                <div className="flex grid-cols-7">
                    <div className="flex lg:justify-between items-center z-9999">
                        <motion.nav
                            className="flex flex-col text-black"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {navItems.map((item) => (
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    key={item.label}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={(e) =>
                                            handleClick(e, item.href)
                                        }
                                        className={`text-3xl md:text-5xl lg:text-7xl tracking-tighter font-bold hover:bg-stone-900 hover:text-white block py-2`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                    </div>
                    <div className="h-96">
                        <div className="absolute top-0 right-0 sm:w-7/12 md:w-2/4 lg:w-1/4 text-sm md:text-xl lg:text-2xl text-gray-700 font-pretendard tracking-tighter whitespace-pre-wrap">
                            <HeaderProductSearch />
                        </div>
                    </div>
                </div>

                {/* AnimatedSVG 위치 조정 */}
                <div>
                    {/* <div
                        className="inset-0 flex items-center justify-center -z-10"
                        style={{ top: 'auto', bottom: 0 }} // top 대신 bottom 사용
                    >
                        <AnimatedSVG />
                    </div> */}
                    <div id="comment" className="text-center z-20">
                        <motion.div
                            ref={commentRef}
                            initial={{ opacity: 0, y: -20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 20,
                                delay: 1,
                            }}
                            className="text-7xl md:text-8xl lg:text-9xl tracking-wider font-bold" // text-transparent 제거
                        >
                            <TextWithVideo />
                        </motion.div>
                    </div>
                </div>
            </div>
        </header>
    )
}

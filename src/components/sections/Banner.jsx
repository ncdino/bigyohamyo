'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css' // Swiper CSS import
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { delay } from 'framer-motion'

const banners = [
    {
        image: '/banner/banner1.jpg',
        link: '/#',
    },
    {
        image: '/banner/banner2.jpg',
        link: '/#',
    },
    {
        image: '/banner/banner3.jpg',
        link: '/#',
    },
    {
        image: '/banner/banner4.jpg',
        link: '/#',
    },
]
export default function Banner() {
    const settings = {
        spaceBetween: 0,
        slidesPerView: 1,
        pagination: { clickable: true },
        navigation: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        loop: true,
        className: 'lg:h-[250px] h-[100px]',
        modules: [Autoplay, Pagination, Navigation],
    }

    return (
        <section className="relative py-10">
            <div className="container">
                <Swiper {...settings}>
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full rounded-3xl overflow-hidden cursor-pointer">
                                <Link
                                    href={banner.link}
                                    passHref
                                    legacyBehavior
                                >
                                    <a>
                                        <Image
                                            src={banner.image}
                                            alt={`Banner ${index + 1}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </a>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

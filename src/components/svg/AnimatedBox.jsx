'use client'

import { useEffect } from 'react'
import { animate } from 'motion'

export default function AnimatedBox() {
    useEffect(() => {
        animate(
            '.box',
            { rotate: 90 },
            { type: 'spring', repeat: Infinity, repeatDelay: 0.2 }
        )
    }, [])

    return (
        <div className="box w-24 h-24 bg-pink-500 rounded-lg"></div>
    )
}

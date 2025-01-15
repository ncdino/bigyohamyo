'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Changed() {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(!isOn)

    return (
        <div>
            <button
                className={`relative flex items-center cursor-pointer w-52 h-24 p-2 rounded-full transition-colors duration-200 ${
                    isOn
                        ? 'bg-gray-400 justify-end'
                        : 'bg-gray-600 justify-start'
                }`}
                onClick={toggleSwitch}
            >
                <span className="absolute left-3">{isOn ? '' : 'Off'}</span>
                <motion.div
                    className="w-20 h-20 bg-purple-500 rounded-full"
                    layout
                    transition={{
                        type: 'spring',
                        duration: 0.2,
                        bounce: 0.2,
                    }}
                />
                <span className="absolute right-3">{isOn ? 'On' : ''}</span>
            </button>

            {isOn ? <Header /> : <Footer />}
        </div>
    )
}

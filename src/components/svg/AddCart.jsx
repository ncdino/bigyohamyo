import React from 'react'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

const AddCart = ({ onClick, width, height, className }) => {
    const hoverAnimation = {
        scale: 1.2,
        transition: {
            type: 'spring',
            stiffness: 300,
        },
    }

    const tapAnimation = {
        scale: 0.9,
        transition: { type: 'spring', stiffness: 200 },
    }

    return (
        <motion.button
            className={twMerge(
                'flex items-center justify-center bg-white border rounded-full cursor-pointer',
                className,
            )}
            whileHover={hoverAnimation}
            whileTap={tapAnimation}
            onClick={onClick}
        >
            <svg
                width={width || '50'}
                height={height || '50'}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11M4 7H20M4 7V13C4 19.3668 5.12797 20.5 12 20.5C18.872 20.5 20 19.3668 20 13V7M4 7L5.44721 4.10557C5.786 3.428 6.47852 3 7.23607 3H16.7639C17.5215 3 18.214 3.428 18.5528 4.10557L20 7"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </motion.button>
    )
}

export default AddCart

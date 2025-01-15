import { motion } from 'framer-motion'

const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
        pathLength: 1,
        transition: {
            duration: 30,
            ease: 'easeInOut',
        },
    },
}
export default function LogoSVG() {
    return (
        <motion.svg
            width="800px"
            height="800px"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M209.202 314C295.069 302.118 353.793 218.418 308.045 135.024C251.513 31.9842 61.8269 106.438 76.8437 219.371C86.6957 293.444 213.097 315.568 234.512 236.857C238.297 222.936 236.714 157.821 218.141 153.168C216.406 152.73 194.202 175.825 184.417 175.825C176.731 175.825 159.616 137.959 141.484 175.825"
                stroke="#ffffff"
                strokeopacity="0.9"
                strokewidth="16"
                strokelinecap="round"
                strokelinejoin="round"
                variants={pathVariants}
            />
        </motion.svg>
    )
}
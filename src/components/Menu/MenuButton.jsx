import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import KittenSVG from '../svg/kittenSVG'

const Menu = ({ color }) => {
    const [isOpen, setIsOpen] = useState(false)

    const menuVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: '-100%' },
    }

    return (
        <nav className="relative">
            <div className="flex justify-between items-center p-4 fixed">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none"
                >
                    <div className="space-y-2">
                        <span
                            className={`block w-7 h-1 ${color ? 'bg-black' : 'bg-white'}`}
                        ></span>
                        <span
                            className={`block w-6 h-1 ${color ? 'bg-black' : 'bg-white'}`}
                        ></span>
                        <span
                            className={`block w-7 h-1 ${color ? 'bg-black' : 'bg-white'}`}
                        ></span>
                    </div>
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full z-50 p-8 bg-[#FFF455]"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="flex flex-col font-pacifico items-center justify-center h-full ">
                            <div className="flex justify-start">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-8 left-6 text-2xl"
                                >
                                    <span
                                        className={`block w-7 h-1 bg-black rotate-45`}
                                    ></span>
                                    <span
                                        className={`block w-7 h-1 bg-black -rotate-45`}
                                    ></span>
                                </button>
                            </div>
                            <KittenSVG
                                className={
                                    'absolute rotate-45 size-52 md:size-72 top-12 right-1'
                                }
                                strokeColor="#000000"
                            />
                            <div className="relative flex flex-col justify-center text-center gap-16">
                                <a
                                    href="/"
                                    className="block py-2 text-6xl md:text-7xl lg:text-8xl text-gray-900 hover:text-gray-600"
                                >
                                    home
                                </a>
                                <a
                                    href="/drylist"
                                    className="block py-2 text-6xl md:text-7xl lg:text-8xl text-gray-900 hover:text-gray-600"
                                >
                                    dry feeds
                                </a>
                                <a
                                    href="/wetlist"
                                    className="block py-2 text-6xl md:text-7xl lg:text-8xl text-gray-900 hover:text-gray-600"
                                >
                                    wet feeds
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Menu

import { twMerge } from 'tailwind-merge'

export const Card = ({ className, children, ...other }) => {
    return (
        <div
            className={twMerge(
                "font-paperlogy mx-4 rounded-5xl relative z-0 after:z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-5xl after:outline-white/20 after:pointer-events-none p-6 lg:h-[1000px] overflow-hidden",
                className,
            )}
            {...other}
        >
            <div className="absolute inset-0 -z-10 opacity-5"></div>
            {children}
        </div>
    )
}

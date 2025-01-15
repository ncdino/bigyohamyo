import LogoFile from '../svg/LogoFile'

export default function Footer() {
    const footerLinks = [
        {
            title: 'GitHub',
            href: 'https://github.com/ncdino',
        },
        {
            title: 'Email',
            href: 'mailto:jahhyn@gmail.com',
        },
    ]

    return (
        <footer className="relative bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 font-paperlogy">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex text-sm flex-col md:flex-row text-gray-400 gap-4 md:gap-8">
                        <p className="text-5xl font-bold tracking-tighter text-center text-gray-100">
                            비교하묘
                        </p>
                        <p className='flex justify-center items-center'>&copy; 2025. All rights reserved.</p>
                    </div>
                    <nav className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                        {footerLinks.map((link) => (
                            <a
                                key={link.title}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-gray-200"
                            >
                                <span>{link.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14 3l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    )
}

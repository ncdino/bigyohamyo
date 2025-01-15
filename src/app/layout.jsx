import './globals.css'
import QueryProvider from '@/components/QueryProvider' // QueryProvider import
import Footer from '@/components/sections/Footer'
import localFont from 'next/font/local'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

const paperlogy = localFont({
    src: [
        { path: './fonts/Paperlogy-1Thin.ttf', weight: '100', style: 'normal' },
        {
            path: './fonts/Paperlogy-2ExtraLight.ttf',
            weight: '200',
            style: 'normal',
        },
        {
            path: './fonts/Paperlogy-3Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/Paperlogy-4Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Paperlogy-5Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/Paperlogy-6SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        { path: './fonts/Paperlogy-7Bold.ttf', weight: '700', style: 'normal' },
        {
            path: './fonts/Paperlogy-8ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: './fonts/Paperlogy-9Black.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-paperlogy',
})

export const metadata = {
    title: '비교하묘',
    description: '고양이 사료성분 비교',
}

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${paperlogy.variable} ${pacifico.className}`}
        >
            <body className="antialiased">
                <QueryProvider>{children}</QueryProvider>
                <Footer />
            </body>
        </html>
    )
}

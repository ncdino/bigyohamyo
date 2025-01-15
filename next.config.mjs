/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}

export default nextConfig
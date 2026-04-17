/** @type {import('next').NextConfig} */
const nextConfig = {
    /* App Router handles i18n differently, removed legacy i18n config */
    output: 'standalone', // Optimization for build traces
    images: {
        unoptimized: true, // Sustainable SSG doesn't need image optimization server
    },
};

export default nextConfig;

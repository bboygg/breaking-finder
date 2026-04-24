/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Required for GitHub Pages
    basePath: '/breaking-finder', // Match your repository name
    images: {
        unoptimized: true, 
    },
};

export default nextConfig;

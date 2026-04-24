/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Required for GitHub Pages
    images: {
        unoptimized: true, 
    },
    // If your repo name is 'breaking-finder', you might need this:
    // basePath: '/breaking-finder',
};

export default nextConfig;

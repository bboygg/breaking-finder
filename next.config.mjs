/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Required for GitHub Pages
    // basePath removed because custom domain breakingfinder.com uses root path
    images: {
        unoptimized: true, 
    },
};

export default nextConfig;

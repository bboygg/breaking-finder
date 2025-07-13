/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {        
        locales: ['en', 'kr'], // Locales we support in application
        defaultLocale: 'en', // Default locale when visit the application
    },
};

export default nextConfig;
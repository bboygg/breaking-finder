/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {        
        locales: ['en', 'kr'], // Locales we support in application
        defaultLocale: 'en', // Default locale when visit the application
    },
};

export default nextConfig;


// module.exports = {
//     i18n: {
//       // These are all the locales you want to support in
//       // your application
//       locales: ['ko', 'en', 'ja'],
//       // This is the default locale you want to be used when visiting
//       // a non-locale prefixed path e.g. `/hello`
//       defaultLocale: 'en',
//       localeDetection: false,
//       // This is a list of locale domains and the default locale they
//       // should handle (these are only required when setting up domain routing)
//       // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
//       // domains: [
  
//       // ],
//     },
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//       });
  
//       return config;
//     },
//     // inject environment variabled set in its pod
//     publicRuntimeConfig: {
//       NEXT_PUBLIC_TARGET: process.env.TARGET,
//       NEXT_PUBLIC_LANDPRESS_CONTENT_ADDR: process.env.LANDPRESS_CONTENT_ADDR,
//       NEXT_PUBLIC_LANDPRESS_API_KEY: process.env.LANDPRESS_API_KEY,
//       NEXT_PUBLIC_SLACK_CHANNEL: process.env.SLACK_CHANNEL,
//     },
  
//     /** @type {import('next').NextConfig} */
//     transpilePackages: [
//       // antd & deps
//       "@ant-design",
//       "@rc-component",
//       "antd",
//       "rc-cascader",
//       "rc-checkbox",
//       "rc-collapse",
//       "rc-dialog",
//       "rc-drawer",
//       "rc-dropdown",
//       "rc-field-form",
//       "rc-image",
//       "rc-input",
//       "rc-input-number",
//       "rc-mentions",
//       "rc-menu",
//       "rc-motion",
//       "rc-notification",
//       "rc-pagination",
//       "rc-picker",
//       "rc-progress",
//       "rc-rate",
//       "rc-resize-observer",
//       "rc-segmented",
//       "rc-select",
//       "rc-slider",
//       "rc-steps",
//       "rc-switch",
//       "rc-table",
//       "rc-tabs",
//       "rc-textarea",
//       "rc-tooltip",
//       "rc-tree",
//       "rc-tree-select",
//       "rc-upload",
//       "rc-util",
//     ],
//   };
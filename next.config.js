/** @type {import('next').NextConfig} */
// const nextConfig = { resolve: {
//         fallback: {
//             "fs": false
//         },
//         webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//             config.node = {
//                 fs: 'empty'
//             }
//             return config
//         },
//     }}

module.exports = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};
// webpack.config.js



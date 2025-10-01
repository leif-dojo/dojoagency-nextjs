/** @type {import('next').NextConfig} */
const Redirects = require('./redirects.js')
const nextConfig = {
  //reactStrictMode: false,
  output: 'standalone',
  experimental: {
    esmExternals: true, // enables ES modules externals, useful for modern bundling
  },
  trailingSlash: true,
  
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'cleanupIds',
                params: {
                  "minify": false
                },
              },
            ],
          },
        },
      }],
    })

    return config
  },
  images: {
    //domains: ['cms.dojoagency.com.local', 'localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.dojoagency.com.local',
      },
      {
        protocol: 'https',
        hostname: 'cms.dojoagency.com',
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: !!process.env.IGNORE_TS_ERRORS,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 1000,
  async redirects() {
    return Redirects
  },
}

module.exports = nextConfig

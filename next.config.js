/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', //enabled static export for static deploy
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {

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
        protocol: 'http',
        hostname: '**.dojoagency.com',
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
}

module.exports = nextConfig

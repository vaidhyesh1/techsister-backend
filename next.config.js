/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
      },
      async headers() {
        return [
          {
            source: '/',
            headers: [
              {
                key: 'Content-Security-Policy',
                value: 'upgrade-insecure-requests',
              },
            ],
          },
        ];
      },
}

module.exports = nextConfig

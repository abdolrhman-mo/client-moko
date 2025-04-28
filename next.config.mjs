/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: new URL(process.env.NEXT_PUBLIC_API_URL).protocol.replace(':', ''),
            hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname,
            port: new URL(process.env.NEXT_PUBLIC_API_URL).port || '',
            // pathname: '/media/products/**',
            pathname: '**',
        },
    ],
  }
}

export default nextConfig

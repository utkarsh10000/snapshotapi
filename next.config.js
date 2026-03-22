/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: 'https://snapshotapi-backend-production.up.railway.app',
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN: 'live_09533c8a8e7c5ebff42d41746bc',
  },
}

module.exports = nextConfig
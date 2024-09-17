/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Matches any route starting with /api
        destination: 'https://themisai-f046a65ea0b0.herokuapp.com/api/:path*/', // Your backend URL
      },
    ];
  },
};

export default nextConfig; // Use ES module syntax for compatibility

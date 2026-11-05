/**
 * Next.js configuration for the Apollo Physicians site.
 *
 * Redirects (permanent, 301):
 * - Sacramento family and location URLs from the previous site go to the home page, which is the
 *   single canonical page for "Family Physician in Sacramento".
 * - The provider URL used on the previous site goes to Dr. Paramjit Panesar's page.
 * - The bare apollophysicians.com host redirects to https://www.apollophysicians.com.
 *
 * Trailing slashes are removed (trailingSlash: false), so every path has one form.
 *
 * @type {import('next').NextConfig}
 */

const SITE_HOST = 'www.apollophysicians.com';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async redirects() {
    return [
      // Non-www to www, on the single canonical host.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'apollophysicians.com' }],
        destination: `https://${SITE_HOST}/:path*`,
        permanent: true,
        statusCode: 301,
      },
      // The previous domain. Works once both hosts are attached to this Vercel project.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'drparamjitpanesar.com' }],
        destination: `https://${SITE_HOST}/:path*`,
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.drparamjitpanesar.com' }],
        destination: `https://${SITE_HOST}/:path*`,
        permanent: true,
        statusCode: 301,
      },
      { source: '/family-physician-sacramento', destination: '/', permanent: true, statusCode: 301 },
      { source: '/locations', destination: '/', permanent: true, statusCode: 301 },
      { source: '/locations/:slug*', destination: '/', permanent: true, statusCode: 301 },
      { source: '/providers/paramjit-panesar', destination: '/dr-paramjit-panesar', permanent: true, statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'geolocation=(self), camera=(), microphone=()' },
        ],
      },
    ];
  },
};

export default nextConfig;

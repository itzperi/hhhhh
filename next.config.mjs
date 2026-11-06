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

/**
 * Legacy URLs from the previous apollophysicians.com site (archived 2023), per the redirect map in
 * docs/seo/audit.md section 6, approved 5 Nov 2026. Only unconditional rows are live.
 *
 * Deliberately NOT redirected, so they stay 404 until the practice answers (client-confirmations.md):
 *   /provider/jaspreet-tiwana-md, /provider/ramandeep-dhaliwal-md, /provider/ethelyne-j-acebedo-fnp-bc (item 17),
 *   /pay-now (item 29), /service/telemedicine (item 27), and the services that are not confirmed:
 *   chronic-disease-management, immunizations, pediatrics, mental-health, immigration-exams, women's-health (item 26).
 * After Dr. Panesar's review, re-point /service/primary-care to /services and /service/immigration-exams to
 * /immigration-medical-exam-sacramento.
 */
const LEGACY_REDIRECTS = [
  // Generic pages of the old site: the home page is the closest equivalent.
  ...['/about', '/index', '/contents', '/providers'].map((source) => ({ source, destination: '/' })),
  // Contact and visit pages now have an equivalent.
  ...['/contact-us', '/visit', '/location/sacramento-ca'].map((source) => ({ source, destination: '/contact' })),
  // The same physician, now at /dr-paramjit-panesar-md (the previous URL of this site is redirected too).
  ...['/provider/paramjit-panesar-md', '/providers/paramjit-panesar', '/dr-paramjit-panesar'].map((source) => ({
    source,
    destination: '/dr-paramjit-panesar-md',
  })),
  // Insurance and pricing.
  ...['/content/insurance', '/content/cash-prices'].map((source) => ({ source, destination: '/insurance-accepted' })),
  // Becoming a patient and booking.
  ...['/content/new-patients', '/schedule', '/registration'].map((source) => ({ source, destination: '/new-patients' })),
  // Family medicine as a service: the services page waits for Dr. Panesar's review, so these go to the home page.
  ...['/service/primary-care', '/service/same-day-visits'].map((source) => ({ source, destination: '/' })),
  // No privacy, terms or accessibility pages exist yet. Re-point when they do.
  ...['/accessibility-statement', '/your-privacy', '/our-terms'].map((source) => ({ source, destination: '/' })),
].map((rule) => ({ ...rule, permanent: true, statusCode: 301 }));

/**
 * Retired content with nothing to carry over: cosmetic services, testimonials and the blog. Served as
 * 410 Gone (through the /gone route) so search engines drop them faster than a 404.
 */
const GONE_PATHS = [
  '/aesthetics',
  '/service/body-sculpting',
  '/service/hydrafacial',
  '/service/injectables',
  '/service/laser-hair-removal',
  '/service/laser-resurfacing',
  '/service/medical-weight-loss',
  '/service/microneedling',
  '/service/morpheus-8',
  '/testimonials',
  '/blog',
  '/blog-archive',
  '/post',
];

/**
 * Optional: NEXT_BUILD_CPUS=1 runs the production build in one worker. Use it on a machine with little free memory,
 * because each build worker loads the image renderer used for the share images. Unset on Vercel (the default is fine).
 */
const buildCpus = Number(process.env.NEXT_BUILD_CPUS ?? 0);

const nextConfig = {
  ...(buildCpus > 0 ? { experimental: { cpus: buildCpus } } : {}),
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
      ...LEGACY_REDIRECTS,
    ];
  },
  async rewrites() {
    return GONE_PATHS.map((source) => ({ source, destination: '/gone' }));
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

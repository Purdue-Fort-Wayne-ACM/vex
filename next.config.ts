const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  distDir: 'out',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'], // Include MDX files as pages
  // Optional: Add any other Next.js config below
  images: {
    unoptimized: true, // Disable image optimization
  },
};

module.exports = withMDX(nextConfig);
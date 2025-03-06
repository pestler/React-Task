import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  reactStrictMode: true,
  distDir: 'dist',
  basePath: '/React-Task',
  assetPrefix: '/React-Task/',
  trailingSlash: true,
  output: 'export',
};
export default nextConfig;

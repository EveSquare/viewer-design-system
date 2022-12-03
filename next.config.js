/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  experimental: {
    // ログのデータ(マップ・メタ)が多いため拡張 "デフォルトは128KBです。
    // しかし、2.7MBほどの大きさがあるため3MBとする。
    // 詳細: https://nextjs.org/docs/messages/large-page-data
    largePageDataBytes: 1024 * 1024 * 3, // 3MB
  },
  images: {
    domains: ["raw.githubusercontent.com"],
    unoptimized: true
  },
  // basePath: "/viewer",
  // assetPrefix: "/viewer",
}

module.exports = nextConfig
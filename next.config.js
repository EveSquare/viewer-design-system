/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

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
  },
  i18n,
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  publicRuntimeConfig: {
    LOG_HOST: "https://raw.githubusercontent.com/",
  },
  experimental: {
    // ログのデータ(マップ・メタ)が多いため拡張 "デフォルトは128KBです。
    // しかし、2.7MBほどの大きさがあるため3MBとする。
    // 詳細: https://nextjs.org/docs/messages/large-page-data
    largePageDataBytes: 1024 * 1024 * 3, // 3MB
  },
}

module.exports = nextConfig
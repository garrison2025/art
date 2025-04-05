/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 改回 export 以支持静态部署
  images: {
    unoptimized: true,  // Cloudflare Pages 需要禁用图片优化
    domains: ['gibleartai.org'],  // 允许的图片域名
  },
  // 确保应用可以在子路径下运行
  basePath: '',
  assetPrefix: '',
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
    serverActions: false,
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': '.',
        '@app': './app',
        '@components': './app/components',
        '@lib': './app/lib',
      },
      modules: ['node_modules', '.'],
    }
    return config
  },
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静态导出
  images: {
    unoptimized: true,  // Cloudflare Pages 需要禁用图片优化
    domains: ['gibleartai.org'],  // 允许的图片域名
  },
  // 确保应用可以在子路径下运行
  basePath: '',
  assetPrefix: '',
} 
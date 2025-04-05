import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// 需要认证的路由
const protectedRoutes = ['/transform']

// 速率限制存储
const ipUsageMap = new Map<string, { count: number; resetTime: number }>()

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 检查是否是受保护的路由
  if (protectedRoutes.includes(path)) {
    const token = await getToken({ req: request })
    
    // 如果没有token，重定向到登录页面
    if (!token) {
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(url)
    }

    // 获取客户端IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    const now = Date.now()
    
    // 获取或初始化IP使用记录
    let usage = ipUsageMap.get(ip)
    if (!usage || usage.resetTime < now) {
      usage = {
        count: 0,
        resetTime: now + 24 * 60 * 60 * 1000, // 24小时后重置
      }
      ipUsageMap.set(ip, usage)
    }

    // 检查使用次数
    if (usage.count >= Number(process.env.DAILY_USAGE_LIMIT)) {
      return NextResponse.json(
        { error: 'Daily usage limit reached. Please try again tomorrow.' },
        { status: 429 }
      )
    }

    // 增加使用次数
    usage.count++
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/transform/:path*'],
} 
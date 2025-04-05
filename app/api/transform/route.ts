import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { transformImage } from '@/lib/ai'
import { fileToBase64 } from '@/lib/image'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('image') as File
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // 转换图片为 base64
    const base64Image = await fileToBase64(file)
    
    // 调用 AI 服务转换图片
    const transformedImage = await transformImage(base64Image)

    return NextResponse.json({ 
      success: true, 
      image: transformedImage 
    })
  } catch (error) {
    console.error('Transform error:', error)
    return NextResponse.json(
      { error: 'Failed to transform image' }, 
      { status: 500 }
    )
  }
} 
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function TransformPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [transformedImage, setTransformedImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setSelectedImage(file)
      setPreviewUrl(objectUrl)
      setTransformedImage('')
      setError('')

      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const handleTransform = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)

      const response = await fetch('/api/transform', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to transform image')
      }

      const data = await response.json()
      setTransformedImage(`data:image/png;base64,${data.image}`)
    } catch (err) {
      setError('Failed to transform image. Please try again.')
      console.error('Transform error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!transformedImage) return

    const base64Data = transformedImage.split(',')[1]
    const blob = new Blob([Buffer.from(base64Data, 'base64')], { type: 'image/png' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'ghibli-style-art.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Transform Your Photo into Ghibli Art
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Original Image</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {previewUrl ? (
                  <div className="relative aspect-square">
                    <Image
                      src={previewUrl}
                      alt="Original"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="py-12">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-700"
                    >
                      Click to upload an image
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      or drag and drop
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Transformed Image</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {transformedImage ? (
                  <div className="relative aspect-square">
                    <Image
                      src={transformedImage}
                      alt="Transformed"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="py-12 text-gray-500">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2">Transforming...</span>
                      </div>
                    ) : (
                      <p>Your transformed image will appear here</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleTransform}
              disabled={!selectedImage || isLoading}
              className={`px-6 py-2 rounded-lg font-semibold ${
                !selectedImage || isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Transform Image
            </button>
            {transformedImage && (
              <button
                onClick={handleDownload}
                className="px-6 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700"
              >
                Download
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Tips for Best Results</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Use clear, well-lit photos for best transformation results</li>
            <li>Images with distinct subjects work best</li>
            <li>Recommended image size: 1024x1024 pixels</li>
            <li>Supported formats: JPG, PNG</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 
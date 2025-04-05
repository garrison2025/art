import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.AI_SERVICE_API_KEY,
})

export async function transformImage(imageBase64: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Transform this image into Ghibli style artwork. Make it look like a scene from a Studio Ghibli movie, with the characteristic soft colors, detailed backgrounds, and magical atmosphere. Return the transformed image in base64 format."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    })

    // 从响应中提取生成的图片
    const generatedImage = response.choices[0]?.message?.content
    if (!generatedImage) {
      throw new Error('No image generated')
    }

    return generatedImage
  } catch (error) {
    console.error('AI transformation error:', error)
    throw error
  }
} 
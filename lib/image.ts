export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result as string
      // 移除 data:image/jpeg;base64, 前缀
      resolve(base64String.split(',')[1])
    }
    reader.onerror = error => reject(error)
  })
}

export function base64ToBlob(base64: string): Blob {
  const byteString = atob(base64)
  const mimeString = 'image/png'
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  
  return new Blob([ab], { type: mimeString })
} 
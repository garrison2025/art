# Gible Art AI

Transform your photos into stunning Ghibli-style artwork using advanced AI technology.

## Features

- Easy-to-use web interface
- High-quality image transformations
- Multiple pricing tiers
- Fast processing
- Secure file handling
- Responsive design

## Tech Stack

- Frontend: Next.js 14, React, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- File Storage: AWS S3
- AI Service: Stable Diffusion API
- Authentication: NextAuth.js

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gibleartai.git
cd gibleartai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
AI_SERVICE_API_KEY=your_ai_service_api_key
MONGODB_URI=your_mongodb_uri
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
gibleartai/
├── app/
│   ├── api/
│   │   └── transform/
│   │       └── route.ts
│   │   
│   ├── transform/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── public/
├── styles/
└── types/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/gibleartai](https://github.com/yourusername/gibleartai) 
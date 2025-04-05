'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Gible Art AI</h1>
          <p className="text-gray-400">Sign in to transform your images</p>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: '/transform' })}
          className="w-full bg-white text-gray-900 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
        >
          <Image
            src="/google-logo.svg"
            alt="Google"
            width={18}
            height={18}
          />
          <span>Continue with Google</span>
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
} 
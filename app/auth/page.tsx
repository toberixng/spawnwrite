// /app/auth/page.tsx
'use client'

import { FormEvent, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setError(error.message)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-6"
      >
        {status !== 'sent' ? (
          <form
            onSubmit={handleLogin}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-4"
          >
            <h1 className="text-2xl font-semibold">Get access via email</h1>

            <div className="space-y-2">
              <label htmlFor="email" className="text-base font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-black text-white hover:bg-gray-900 transition rounded-lg p-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Magic Link'}
            </button>

            <p className="text-sm text-center text-gray-500">
              Already have an account? Enter your email to log in.
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
            <Mail className="mx-auto h-10 w-10 text-green-600" />
            <h2 className="text-xl font-semibold">Check your email</h2>
            <p className="text-gray-600">
              We've sent you a magic link to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setStatus('idle')
                setEmail('')
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Go back and edit email
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

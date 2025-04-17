'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setError(error.message)
      toast.error(error.message)
    } else {
      toast.success('Check your email to confirm your account.')
      router.push('/dashboard')
    }

    setLoading(false)
  }

  const handleMagicLink = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setError(error.message)
      toast.error(error.message)
    } else {
      toast.success('Magic link sent to your email.')
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) toast.error(error.message)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[#121C27] text-[#edeee3] px-4"
    >
      <form
        onSubmit={handleRegister}
        className="bg-[#1e293b] w-full max-w-md p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create an account</h2>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="bg-[#121C27] text-[#edeee3]"
          />
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            required
            className="bg-[#121C27] text-[#edeee3] pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-[#edeee3] hover:text-[#121C27] transition duration-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          variant="default"
          disabled={loading}
          className="w-full"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign up'}
        </Button>

        <Button
          type="button"
          onClick={handleMagicLink}
          disabled={loading || !email}
          className="w-full"
          variant="outline"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Magic Link'}
        </Button>

        <Separator className="my-4" />
        <div className="text-center text-sm">OR</div>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="secondary"
          className="w-full"
        >
          Continue with Google
        </Button>

        <div className="text-sm text-center pt-2">
          Already have an account?{' '}
          <a href="/auth/login" className="underline hover:text-[#edeee3]">
            Login
          </a>
        </div>
      </form>
    </motion.div>
  )
}

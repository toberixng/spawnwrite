// app/auth/login/page.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Login successful' })
      router.push('/')
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  const handleMagic = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)

    if (error) {
      toast({ title: 'Magic link failed', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Magic link sent', description: 'Check your email to complete login.' })
    }
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#121C27', color: '#edeee3' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 p-6 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <div>
          <Label>Email</Label>
          <Input
            className="mt-1"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              className="mt-1 pr-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-2.5 right-3 text-sm text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <a href="#" className="text-sm hover:underline" style={{ color: '#edeee3' }}>
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full transition-colors duration-200 hover:bg-[#edeee3] hover:text-[#121C27]"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
          Login
        </Button>

        <Separator className="my-4" />
        <div className="text-center text-sm">OR</div>

        <Button
          type="button"
          onClick={handleGoogle}
          variant="outline"
          className="w-full hover:bg-[#edeee3] hover:text-[#121C27] transition duration-200"
        >
          Continue with Google
        </Button>

        <Button
          type="button"
          onClick={handleMagic}
          disabled={loading}
          variant="ghost"
          className="w-full hover:bg-[#edeee3] hover:text-[#121C27] transition duration-200"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
          Send Magic Link
        </Button>
      </form>
    </motion.div>
  )
}

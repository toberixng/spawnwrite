// Path: /app/auth/register/page.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

export default function Register() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Registration successful, check your email for verification.")
      router.push("/auth/login")
    }

    setLoading(false)
  }

  const handleGoogleOAuth = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast.error(error.message)
    }

    setLoading(false)
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Check your email for the login link.")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl text-center mb-6">Register</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#edeee3]">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#121C27] text-[#edeee3] focus-visible:ring-[#4285F4]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#edeee3]">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#121C27] text-[#edeee3] focus-visible:ring-[#4285F4]"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4285F4] text-white hover:bg-[#357ae8]"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </Button>
      </form>

      <Button
        type="button"
        className="w-full border-[#121C27] text-[#121C27] mt-4 hover:bg-[#edeee3] hover:text-[#121C27] flex items-center gap-2"
        onClick={handleGoogleOAuth}
        disabled={loading}
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>

      <form onSubmit={handleMagicLink} className="mt-4 space-y-3">
        <div>
          <Label htmlFor="magic-email" className="text-[#edeee3]">Email for Magic Link</Label>
          <Input
            id="magic-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#121C27] text-[#edeee3] focus-visible:ring-[#4285F4]"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="w-full border-[#121C27] text-[#121C27] mt-4 hover:bg-[#edeee3] hover:text-[#121C27]"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </Button>
      </form>
    </div>
  )
}

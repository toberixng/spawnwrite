// Path: /components/auth/AuthForm.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export const AuthForm = () => {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Logged in successfully")
      router.push("/dashboard")  // Redirect to dashboard after successful login
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#121C27]">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#edeee3] text-[#121C27] focus-visible:ring-[#4285F4]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#121C27]">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#edeee3] text-[#121C27] focus-visible:ring-[#4285F4]"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#4285F4] text-white hover:bg-[#357ae8]"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </Button>
      <div className="text-center mt-4">
        <p>Don't have an account? <a href="/auth/register" className="text-blue-500">Sign Up</a></p>
      </div>
    </form>
  )
}

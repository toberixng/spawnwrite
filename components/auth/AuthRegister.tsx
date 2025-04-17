// Path: /components/auth/AuthRegister.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export const AuthRegister = () => {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation to check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Registration successful! Please check your email to confirm your account.")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#121C27]">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
          className="bg-[#edeee3] text-[#121C27] focus-visible:ring-[#4285F4]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-[#121C27]">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="bg-[#edeee3] text-[#121C27] focus-visible:ring-[#4285F4]"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#4285F4] text-white hover:bg-[#357ae8]"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  )
}

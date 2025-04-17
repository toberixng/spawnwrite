// Path: /components/auth/AuthPassword.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { motion } from 'framer-motion'

export const AuthPassword = () => {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Logged in successfully")
    }

    setLoading(false)
  }

  return (
    <motion.form
      onSubmit={handleSignIn}
      className="space-y-4 p-4 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Label htmlFor="email" className="text-[#121C27]">Email</Label>
      <Input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#edeee3] text-[#121C27] text-lg p-4 rounded-lg"
        placeholder="Enter your email"
      />
      <Label htmlFor="password" className="text-[#121C27]">Password</Label>
      <Input
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-[#edeee3] text-[#121C27] text-lg p-4 rounded-lg"
        placeholder="Enter your password"
      />
      <Button
        type="submit"
        className="w-full bg-[#121C27] text-[#edeee3] rounded-lg hover:bg-[#edeee3] hover:text-[#121C27] transition duration-200"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </Button>
    </motion.form>
  )
}

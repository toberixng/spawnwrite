// Path: /components/auth/AuthMagicLink.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "../../lib/supabase/client"
import { motion } from 'framer-motion'

export const AuthMagicLink = () => {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
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
    <motion.form
      onSubmit={handleMagicLink}
      className="space-y-4 p-4 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Label htmlFor="magic-email" className="text-[#121C27]">Enter your email to get started</Label>
      <Input
        id="magic-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#edeee3] text-[#121C27] text-lg p-4 rounded-lg"
        placeholder="Enter your email"
      />
      <Button
        type="submit"
        className="w-full bg-[#121C27] text-[#edeee3] rounded-lg hover:bg-[#edeee3] hover:text-[#121C27] transition duration-200"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Magic Link"}
      </Button>
    </motion.form>
  )
}

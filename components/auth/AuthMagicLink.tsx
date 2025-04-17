// Path: /components/auth/AuthMagicLink.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "../../lib/supabase/client"

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
    <form onSubmit={handleMagicLink} className="space-y-3">
      <Label htmlFor="magic-email" className="text-[#121C27]">Email for Magic Link</Label>
      <Input
        id="magic-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#edeee3] text-[#121C27] focus-visible:ring-[#4285F4]"
      />
      <Button
        type="submit"
        variant="outline"
        className="w-full border-[#121C27] text-[#121C27]"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Magic Link"}
      </Button>
    </form>
  )
}

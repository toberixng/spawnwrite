// Path: /components/auth/AuthOAuth.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export const AuthOAuth = () => {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleOAuthLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast.error(error.message)
    }

    setLoading(false)
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-[#121C27] text-[#121C27] flex items-center gap-2"
      onClick={handleOAuthLogin}
      disabled={loading}
    >
      <FcGoogle size={20} />
      Continue with Google
    </Button>
  )
}

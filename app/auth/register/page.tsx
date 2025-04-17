// Path: /app/auth/register/page.tsx

'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AuthMagicLink } from "@/components/auth/AuthMagicLink"
import { AuthPassword } from "@/components/auth/AuthPassword"

const RegisterPage = () => {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)

  const handleCheckUser = async () => {
    const { data, error } = await supabase.auth.api.getUserByEmail(email)
    if (error) {
      toast.error("Error checking user registration status")
      return
    }
    setIsRegistered(data !== null)
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-[#121C27]">Get started with SpawnWrite</h2>
      
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4">
          {!isRegistered ? (
            <AuthMagicLink />
          ) : (
            <AuthPassword />
          )}
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

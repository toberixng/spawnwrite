'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AuthPassword } from "@/components/auth/AuthPassword"

const LoginPage = () => {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)

  // Method to check if the user is registered
  const handleCheckUser = async () => {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      toast.error("Error checking user registration status")
      return
    }

    // Check if there is a valid session and if the user is logged in
    const user = data?.session?.user
    setIsRegistered(user !== null)
  }

  // Method to handle Magic Link login
  const handleMagicLinkLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      toast.error("Failed to send magic link")
      return
    }
    toast.success("Check your inbox for the magic link!")
    router.push("/auth/callback")
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-[#121C27]">Log in to SpawnWrite</h2>

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Enter your email to get started</Label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleCheckUser}
              className="w-full p-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#121C27] focus:border-[#121C27]"
              placeholder="Your email address"
            />
          </div>

          {/* Conditionally render the login method based on registration status */}
          {!isRegistered ? (
            <div className="space-y-4">
              <Button
                onClick={handleMagicLinkLogin}
                variant="default"
                className="w-full py-3"
              >
                Send Magic Link
              </Button>
              <p className="text-sm text-center">
                Not registered yet?{" "}
                <a
                  href="/auth/register"
                  className="text-[#121C27] hover:underline"
                >
                  Register here
                </a>
              </p>
            </div>
          ) : (
            <AuthPassword />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage

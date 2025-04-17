// Path: /app/auth/login/page.tsx

'use client'

import { AuthForm } from "@/components/auth/AuthForm"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl text-center mb-6">Log In</h2>
      <AuthForm />
    </div>
  )
}

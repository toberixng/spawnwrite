'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const verify = async () => {
      await supabase.auth.getSession()
      router.replace('/') // Redirect to home or dashboard
    }
    verify()
  }, [router])

  return <p className="text-center p-10">Verifying magic link...</p>
}

'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/login-form';
import { SignUpForm } from '@/components/sign-up-form';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  async function handleMagicLink() {
    const email = prompt('Enter your email for a magic link');
    if (!email) return;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Check your email for a magic link');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-md"
    >
      <Card className="bg-neutral">
        <CardHeader>
          <CardTitle className="text-primary">
            {isLogin ? 'Login' : 'Sign Up'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLogin ? <LoginForm /> : <SignUpForm />}
          <Button
            variant="outline"
            className="w-full mt-4 border-primary text-primary hover:bg-primary/10"
            onClick={handleMagicLink}
          >
            Send Magic Link
          </Button>
          <p className="mt-4 text-center text-textMuted">
            {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </p>
          <p className="mt-2 text-sm text-center text-textMuted">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-accent">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-accent">
              Privacy Policy
            </Link>.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
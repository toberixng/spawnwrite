'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      toast.success('Logged in successfully');
      window.location.href = '/dashboard';
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      toast.success('Check your email to confirm signup');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  const handleMagicLink = async () => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-md"
    >
      <h1 className="text-2xl font-bold text-primary mb-4">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-input"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input"
              required
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/80 text-textDark"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
      <Button
        variant="outline"
        className="w-full mt-4 border-blue text-blue hover:bg-blue/10"
        onClick={handleGoogle}
      >
        Sign in with Google
      </Button>
      <Button
        variant="outline"
        className="w-full mt-2 border-primary text-primary hover:bg-primary/10"
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
    </motion.div>
  );
}
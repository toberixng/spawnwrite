// app/[username]/page.tsx
import { createServerClient } from '@/lib/supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';

export default async function UserProfile({ params }: { params: { username: string } }) {
  const supabase = createServerClient();

  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', params.username)
    .single();

  if (error || !profile) {
    console.error('Profile fetch error:', error?.message);
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-neutral">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url || ''} />
              <AvatarFallback>{profile.username[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-primary">{profile.username}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {profile.full_name && <p className="text-textDark">{profile.full_name}</p>}
          {profile.bio && <p className="text-textMuted mt-2">{profile.bio}</p>}
          {profile.website && (
            <a href={profile.website} className="text-accent mt-2 block">
              {profile.website}
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
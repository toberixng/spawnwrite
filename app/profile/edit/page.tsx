// app/profile/edit/page.tsx
import { createServerClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { revalidatePath } from 'next/cache';

export default async function EditProfile() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user?.id)
    .single();

  if (error || !profile) {
    console.error('Profile fetch error:', error?.message);
    return <div>Error loading profile</div>;
  }

  async function updateProfile(formData: FormData) {
    'use server';
    const supabase = createServerClient();
    const username = formData.get('username') as string;
    const full_name = formData.get('full_name') as string;
    const bio = formData.get('bio') as string;
    const website = formData.get('website') as string;

    const { error } = await supabase
      .from('users')
      .update({ username, full_name, bio, website })
      .eq('id', user?.id);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Profile updated');
    revalidatePath('/profile/edit');
  }

  async function uploadAvatar(formData: FormData) {
    'use server';
    const supabase = createServerClient();
    const file = formData.get('avatar') as File;
    if (!file || !['image/png', 'image/jpeg'].includes(file.type)) {
      toast.error('Please upload a PNG or JPG image');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB');
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', user?.id);

    toast.success('Avatar updated');
    revalidatePath('/profile/edit');
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-primary mb-4">Edit Profile</h1>
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatar_url || ''} />
          <AvatarFallback>{profile.username[0]}</AvatarFallback>
        </Avatar>
        <form action={uploadAvatar}>
          <Input type="file" name="avatar" accept="image/png,image/jpeg" />
          <Button type="submit" className="mt-2 bg-accent text-textDark">
            Upload Avatar
          </Button>
        </form>
      </div>
      <form action={updateProfile} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            defaultValue={profile.username}
            className="bg-input"
            required
          />
        </div>
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={profile.full_name || ''}
            className="bg-input"
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            name="bio"
            defaultValue={profile.bio || ''}
            className="bg-input"
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            defaultValue={profile.website || ''}
            className="bg-input"
          />
        </div>
        <Button type="submit" className="bg-accent text-textDark">
          Save Profile
        </Button>
      </form>
    </div>
  );
}
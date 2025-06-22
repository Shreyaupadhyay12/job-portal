
import { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { Camera, Save, User, Phone, MapPin, FileText, Star, Award, Briefcase } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile(user?.id);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    const formData = new FormData(e.currentTarget);

    const updates = {
      full_name: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      bio: formData.get('bio') as string,
      location: formData.get('location') as string,
    };

    const { error } = await updateProfile(updates);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    }

    setUpdating(false);
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await updateProfile({
        avatar_url: data.publicUrl,
      });

      if (updateError) {
        throw updateError;
      }

      toast({
        title: 'Success',
        description: 'Avatar updated successfully!',
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload avatar',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-8">
            <p className="text-center text-gray-600 text-lg">Please sign in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <span className="text-gray-700 text-lg">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-12 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-100/40 to-pink-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-xl text-gray-600">Manage your professional information</p>
          <Star className="h-8 w-8 text-blue-500 mx-auto mt-4" />
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-blue-100/50 transition-all duration-500">
          <CardHeader className="text-center pb-8">
            <div className="relative inline-block">
              <Avatar className="h-32 w-32 mx-auto ring-4 ring-blue-200 hover:ring-blue-300 transition-all duration-300 shadow-xl">
                <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 hover:from-blue-400 hover:to-purple-500 disabled:opacity-50 transform transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Camera className="h-5 w-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                </div>
              )}
            </div>
            <CardTitle className="text-3xl text-gray-800 mt-6 mb-2">
              {profile?.full_name || 'Your Name'}
            </CardTitle>
            <p className="text-gray-600 text-lg">{user.email}</p>
            {uploading && <p className="text-blue-500 mt-2 animate-pulse">Uploading...</p>}
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-gray-700 flex items-center text-lg font-medium">
                    <User className="h-5 w-5 mr-2 text-blue-500" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    defaultValue={profile?.full_name || ''}
                    placeholder="Enter your full name"
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-gray-700 flex items-center text-lg font-medium">
                    <Phone className="h-5 w-5 mr-2 text-green-500" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={profile?.phone || ''}
                    placeholder="Enter your phone number"
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/20 h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="location" className="text-gray-700 flex items-center text-lg font-medium">
                  <MapPin className="h-5 w-5 mr-2 text-purple-500" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={profile?.location || ''}
                  placeholder="Enter your location"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20 h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className="text-gray-700 flex items-center text-lg font-medium">
                  <FileText className="h-5 w-5 mr-2 text-orange-500" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  defaultValue={profile?.bio || ''}
                  placeholder="Tell us about yourself..."
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20 resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={updating} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-blue-200/50"
              >
                <Save className="h-5 w-5 mr-2" />
                {updating ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-blue-800 mb-1">Profile</h3>
              <p className="text-blue-600">Manage your info</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-purple-800 mb-1">Applications</h3>
              <p className="text-purple-600">Track your jobs</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-green-800 mb-1">Network</h3>
              <p className="text-green-600">Connect & grow</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

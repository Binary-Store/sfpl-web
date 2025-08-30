'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X, User, Phone, Mail, MapPin, Building, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ProfileData } from '@/services/api/profile';

interface ProfileFormData {
  name: string;
  phone_number: string;
  email: string;
  address: string;
  organization_name: string;
  gst_number: string;
}

export default function ProfilePage() {
  const { data: profileResponse, isLoading, error, updateProfile, isUpdating, updateError } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    phone_number: '',
    email: '',
    address: '',
    organization_name: '',
    gst_number: ''
  });

  // Extract profile data from response
  const profile: ProfileData | null = profileResponse || null;

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone_number: profile.phone_number || '',
        email: profile.email || '',
        address: profile.address || '',
        organization_name: profile.organization_name || '',
        gst_number: profile.gst_number || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone_number: profile.phone_number || '',
        email: profile.email || '',
        address: profile.address || '',
        organization_name: profile.organization_name || '',
        gst_number: profile.gst_number || ''
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600">Failed to load profile information. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Action Buttons */}
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-red-600" />
                Full Name *
              </label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profile?.name || 'Not provided'}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-600" />
                Phone Number *
              </label>
              {isEditing ? (
                <Input
                  value={formData.phone_number}
                  onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profile?.phone_number || 'Not provided'}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-600" />
                Email Address *
              </label>
              {isEditing ? (
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profile?.email || 'Not provided'}</p>
              )}
            </div>

            {/* Organization Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building className="h-4 w-4 text-red-600" />
                Organization Name
              </label>
              {isEditing ? (
                <Input
                  value={formData.organization_name}
                  onChange={(e) => handleInputChange('organization_name', e.target.value)}
                  placeholder="Enter organization name (optional)"
                  className="w-full"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profile?.organization_name || 'Not provided'}</p>
              )}
            </div>

            {/* GST Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                GST Number
              </label>
              {isEditing ? (
                <Input
                  value={formData.gst_number}
                  onChange={(e) => handleInputChange('gst_number', e.target.value)}
                  placeholder="Enter GST number (optional)"
                  className="w-full"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profile?.gst_number || 'Not provided'}</p>
              )}
            </div>

            {/* Address - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                Address
              </label>
              {isEditing ? (
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address (optional)"
                  rows={3}
                  className="w-full"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profile?.address || 'Not provided'}</p>
              )}
            </div>
          </div>

          {/* Error Display */}
          {updateError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">Failed to update profile. Please try again.</p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

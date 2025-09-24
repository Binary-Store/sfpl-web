"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit,
  Save,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  FileText,
  CreditCard,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ProfileData } from "@/services/api/profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod validation schema
const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: z.string().optional(),
  organization_name: z.string().optional(),
  gst_number: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0 || val.length === 15, {
      message: "GST number must be exactly 15 digits",
    }),
  pan_number: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length === 0 || /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(val),
      {
        message:
          "PAN number must be in format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)",
      }
    ),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const {
    data: profileResponse,
    isLoading,
    error,
    updateProfile,
    isUpdating,
    updateError,
  } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  // Extract profile data from response
  const profile: ProfileData | null = profileResponse || null;

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("phone_number", profile.phone_number || "");
      setValue("address", profile.address || "");
      setValue("organization_name", profile.organization_name || "");
      setValue("gst_number", profile.gst_number || "");
      setValue("pan_number", profile.pan_number || "");
    }
  }, [profile, setValue]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form data to original profile data
    if (profile) {
      setValue("name", profile.name || "");
      setValue("phone_number", profile.phone_number || "");
      setValue("address", profile.address || "");
      setValue("organization_name", profile.organization_name || "");
      setValue("gst_number", profile.gst_number || "");
      setValue("pan_number", profile.pan_number || "");
    }
    setIsEditing(false);
    reset();
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Convert optional fields to match ProfileData interface
      const profileData: ProfileData = {
        name: data.name,
        phone_number: data.phone_number,
        address: data.address || null,
        organization_name: data.organization_name || null,
        gst_number: data.gst_number || null,
        pan_number: data.pan_number || null,
      };

      await updateProfile(profileData);

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Profile
          </h2>
          <p className="text-gray-600">
            Failed to load profile information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <div className="max-w-4xl px-4 sm:px-2 lg:px-2">
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
                  onClick={handleSubmit(onSubmit)}
                  disabled={isUpdating || !isValid}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-red-600" />
                Full Name *
              </label>
              {isEditing ? (
                <div>
                  <Input
                    {...register("name")}
                    placeholder="Enter your full name"
                    className={`w-full ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 font-medium">
                  {profile?.name || "-"}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-600" />
                Phone Number *
              </label>
              {isEditing ? (
                <div>
                  <Input
                    {...register("phone_number")}
                    placeholder="Enter your phone number"
                    className={`w-full ${
                      errors.phone_number ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 font-medium">
                  {profile?.phone_number || "-"}
                </p>
              )}
            </div>

            {/* Email - Read Only */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-600" />
                Email Address
              </label>
              <p className="text-gray-900 font-medium">
                {profile?.email || "-"}
              </p>
            </div>

            {/* Organization Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building className="h-4 w-4 text-red-600" />
                Organization Name
              </label>
              {isEditing ? (
                <div>
                  <Input
                    {...register("organization_name")}
                    placeholder="Enter organization name (optional)"
                    className="w-full"
                  />
                </div>
              ) : (
                <p className="text-gray-900 font-medium">
                  {profile?.organization_name || "-"}
                </p>
              )}
            </div>

            {/* GST Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                GST Number
              </label>
              {isEditing ? (
                <div>
                  <Input
                    {...register("gst_number")}
                    placeholder="Enter GST number (optional)"
                    className="w-full"
                  />
                  {errors.gst_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gst_number.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 font-medium">
                  {profile?.gst_number || "-"}
                </p>
              )}
            </div>

            {/* PAN Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-red-600" />
                PAN Number
              </label>
              {isEditing ? (
                <div>
                  <Input
                    {...register("pan_number")}
                    placeholder="Enter PAN number (optional)"
                    className="w-full uppercase"
                    maxLength={10}
                    onChange={(e) => {
                      // Convert to uppercase and limit to 10 characters
                      const value = e.target.value.toUpperCase().slice(0, 10);
                      e.target.value = value;
                      // Update the form value
                      setValue("pan_number", value);
                    }}
                  />
                  {errors.pan_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pan_number.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 font-medium">
                  {profile?.pan_number || "-"}
                </p>
              )}
            </div>

            {/* Address - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                Address
              </label>
              {isEditing ? (
                <div>
                  <Textarea
                    {...register("address")}
                    placeholder="Enter your address (optional)"
                    rows={3}
                    className="w-full"
                  />
                </div>
              ) : (
                <p className="text-gray-900 font-medium">
                  {profile?.address || "-"}
                </p>
              )}
            </div>
          </form>

          {/* Error Display */}
          {updateError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">
                Failed to update profile. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

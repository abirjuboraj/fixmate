"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Shield,
  UploadCloud,
  CheckCircle2,
  X,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";
import { updateUserProfile } from "@/lib/action/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials, getRoleBadgeStyle, formatRoleLabel, renderRoleIcon } from "@/components/shared/user-badge";
import { UserRole } from "@/types";
import { toast } from "sonner";

interface UpdateProfileFormProps {
  initialUser: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string | null;
    phone?: string | null;
    area?: string | null;
    bio?: string | null;
  };
}

export function UpdateProfileForm({ initialUser }: UpdateProfileFormProps) {
  const router = useRouter();

  // Editable fields state
  const [name, setName] = useState(initialUser.name || "");
  const [phone, setPhone] = useState(initialUser.phone || "");
  const [area, setArea] = useState(initialUser.area || "");
  const [bio, setBio] = useState(initialUser.bio || "");

  // Photo states
  const [currentImage, setCurrentImage] = useState(initialUser.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Status feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userRole = (initialUser.role || "customer") as UserRole;
  const roleLabel = formatRoleLabel(userRole);

  // File selection for avatar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Remove selected new image
  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // Submit profile updates
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = currentImage;

      // 1. If a new photo is selected, upload it to ImgBB
      if (selectedFile) {
        const uploadResult = await uploadImage(selectedFile);
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.message || "Failed to upload photo to ImgBB.");
        }
        finalImageUrl = uploadResult.url;
      }

      // 2. Update user profile in backend database via server action
      await updateUserProfile({
        name: name.trim(),
        phone: phone.trim() || undefined,
        area: area.trim() || undefined,
        bio: bio.trim() || undefined,
        image: finalImageUrl || undefined,
      });

      // 3. Update Better Auth client state so navbar and topbar immediately display the new name & photo without logout!
      await authClient.updateUser({
        name: name.trim(),
        image: finalImageUrl || undefined,
      });

      // Update local state
      setCurrentImage(finalImageUrl);
      handleRemoveSelectedFile();

      toast.success("Profile updated successfully!");

      router.refresh();
    } catch (err: unknown) {
      console.error("Profile update error:", err);
      const message = err instanceof Error ? err.message : "Failed to update profile. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-xs border-border/80">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Information
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Update your public profile details. Changes will reflect instantly across FixMate.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">

          {/* Profile Photo Upload Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-xl border border-border/70 bg-muted/20">
            <div className="relative group shrink-0">
              <Avatar className="h-20 w-20 ring-2 ring-primary/20">
                <AvatarImage
                  src={previewUrl || currentImage || undefined}
                  alt={name || "Profile Photo"}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                  {getUserInitials(name)}
                </AvatarFallback>
              </Avatar>

              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveSelectedFile}
                  className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:opacity-90 cursor-pointer"
                  title="Remove chosen photo"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <Label htmlFor="avatarUpload" className="text-sm font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                <UploadCloud className="h-4 w-4 text-primary" />
                Profile Photo
              </Label>
              <Input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer file:cursor-pointer file:text-xs file:font-semibold file:text-primary file:border-0 file:bg-transparent text-xs max-w-sm"
              />
              <p className="text-[11px] text-muted-foreground">
                Upload a JPEG, PNG, or WebP photo
              </p>
            </div>
          </div>

          {/* Read-Only Fields Grid: Email & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email (Read-Only) */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                Email Address
              </Label>
              <Input
                type="email"
                value={initialUser.email || ""}
                disabled
                className="bg-muted/60 text-muted-foreground cursor-not-allowed text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Role (Read-Only) */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Account Role
              </Label>
              <div className="h-10 px-3 flex items-center rounded-lg border border-border/80 bg-muted/60">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold capitalize flex items-center ${getRoleBadgeStyle(
                    userRole
                  )}`}
                >
                  {renderRoleIcon(userRole)}
                  {roleLabel}
                </Badge>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone & Area (2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+880 1700 000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Service Area / City */}
            <div className="space-y-1.5">
              <Label htmlFor="area" className="text-sm font-medium flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                City / Service Area
              </Label>
              <Input
                id="area"
                type="text"
                placeholder="e.g. Mirpur, Dhaka"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
          </div>

          {/* Short Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-sm font-medium flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              Short Bio (Skills, experience & overview)
            </Label>
            <Textarea
              id="bio"
              rows={4}
              placeholder="Tell customers or technicians about your background or devices you need help with..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2 font-semibold shadow-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

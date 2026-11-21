"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  MapPin,
  FileText,
  Camera,
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
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getUserInitials,
  getRoleBadgeStyle,
  formatRoleLabel,
  renderRoleIcon,
} from "@/components/shared/user-badge";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    setName(initialUser.name || "");
    setPhone(initialUser.phone || "");
    setArea(initialUser.area || "");
    setBio(initialUser.bio || "");
    setCurrentImage(initialUser.image || "");
    handleRemoveSelectedFile();
    toast.info("Changes reverted to original info");
  };

  const isDirty =
    name !== (initialUser.name || "") ||
    phone !== (initialUser.phone || "") ||
    area !== (initialUser.area || "") ||
    bio !== (initialUser.bio || "") ||
    selectedFile !== null;

  // Submit profile updates
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDirty) {
      toast.info("No changes were done.");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = currentImage;

      if (selectedFile) {
        const uploadResult = await uploadImage(selectedFile);
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(
            uploadResult.message || "Failed to upload photo to ImgBB.",
          );
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
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update profile. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
   
      <Card className="h-fit rounded-2xl border-border/70 p-6 shadow-xs">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-2 ring-primary/20">
              <AvatarImage
                src={previewUrl || currentImage || undefined}
                alt={name || "Profile Photo"}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {getUserInitials(name)}
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile photo"
              title="Change profile photo"
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Camera className="h-4 w-4" />
            </button>

            {/* Shown only after choosing a new photo */}
            {previewUrl && (
              <button
                type="button"
                onClick={handleRemoveSelectedFile}
                aria-label="Remove chosen photo"
                title="Remove chosen photo"
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:opacity-90"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <p className="text-lg font-bold text-foreground">
            {name || initialUser.name || "Your Name"}
          </p>
          <p className="text-xs text-muted-foreground break-all">
            {initialUser.email}
          </p>
          <Badge
            variant="outline"
            className={`text-xs font-semibold capitalize flex items-center ${getRoleBadgeStyle(
              userRole,
            )}`}
          >
            {renderRoleIcon(userRole)}
            {roleLabel}
          </Badge>

          <input
            ref={fileInputRef}
            id="avatarUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-[11px] text-muted-foreground">
            Tap the camera icon to upload a JPEG, PNG, or WebP photo
          </p>
        </div>
      </Card>

      {/* ── Edit form card (right, matches the loader) ── */}
      <Card className="lg:col-span-2 rounded-2xl border-border/70 p-6 shadow-xs">
        <div className="space-y-1">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Update your public profile details. Changes will reflect instantly
            across FixMate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* 2-column grid */}

            {/* Full-width name field */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-medium flex items-center gap-1.5"
              >
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

            <div className="space-y-1.5">
              <Label
                htmlFor="area"
                className="text-sm font-medium flex items-center gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                City / Area
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

        

          {/* Full-width bio textarea */}
          <div className="space-y-1.5">
            <Label
              htmlFor="bio"
              className="text-sm font-medium flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              Short Bio (Skills, experience &amp; overview)
            </Label>
            <Textarea
              id="bio"
              rows={4}
              placeholder="Tell customers or technicians about your background or devices you need help with..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Footer actions */}
          <div className="flex justify-end gap-2 border-t border-border/50 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting || !isDirty}
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
          </div>
        </form>
      </Card>
    </div>
  );
}

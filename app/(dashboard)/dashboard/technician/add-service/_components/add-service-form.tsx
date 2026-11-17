"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wrench,
  UploadCloud,
  DollarSign,
  Clock,
  MapPin,
  FileText,
  Tag,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Loader2,
  ShieldAlert,
} from "lucide-react";

import { uploadImage } from "@/lib/uploadImage";
import {
  SERVICE_CATEGORIES,
  SERVICE_MODES,
  AddServicePayload,
} from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddServiceFormProps {
  technician: {
    name: string;
    email: string;
  };
}

export function AddServiceForm({ technician }: AddServiceFormProps) {
  const router = useRouter();

  // Form input states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [serviceMode, setServiceMode] = useState<string>("");
  const [basePrice, setBasePrice] = useState<string>("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [description, setDescription] = useState("");

  // File and preview states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Submission feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      if (errorMessage) setErrorMessage(null);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Client-side field validations
    if (!title.trim()) {
      setErrorMessage("Please enter a service title.");
      return;
    }
    if (!category) {
      setErrorMessage("Please select a service category.");
      return;
    }
    if (!serviceMode) {
      setErrorMessage("Please select a service mode (Home Visit or Shop Drop-off).");
      return;
    }
    const parsedPrice = parseFloat(basePrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage("Base price must be a positive number greater than 0.");
      return;
    }
    if (!estimatedDuration.trim()) {
      setErrorMessage("Please specify estimated duration (e.g. '2-3 hours' or '1 day').");
      return;
    }
    if (!serviceArea.trim()) {
      setErrorMessage("Please enter the service coverage area (e.g. 'Dhanmondi, Dhaka').");
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Please enter what the repair service includes.");
      return;
    }
    if (!imageFile) {
      setErrorMessage("Please choose a service banner image.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Upload service banner image to ImgBB using your uploadImage server action
      const uploadResult = await uploadImage(imageFile);

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.message || "Failed to upload service image to ImgBB.");
      }

      const imageUrl = uploadResult.url;

      // 3. Prepare service payload typed with AddServicePayload
      const servicePayload: AddServicePayload = {
        title: title.trim(),
        category,
        serviceMode,
        basePrice: parsedPrice,
        estimatedDuration: estimatedDuration.trim(),
        serviceArea: serviceArea.trim(),
        description: description.trim(),
        image: imageUrl,
        approvalStatus: "pending", // Default per requirements
        isAvailable: true,         // Default per requirements
      };

      console.log("Submitting service payload:", servicePayload);

      // 4. Send service payload to backend API
      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(servicePayload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create service. Please check your backend route.");
      }

      // Success notification per PDF requirements:
      // "Save with approvalStatus: 'pending' and isAvailable: true. Show a toast that says the service is waiting for admin approval."
      setSuccessMessage("Service submitted successfully! It is now waiting for admin approval.");

      // Reset form fields
      setTitle("");
      setCategory("");
      setServiceMode("");
      setBasePrice("");
      setEstimatedDuration("");
      setServiceArea("");
      setDescription("");
      handleRemoveImage();

      // Redirect technician to their services list after a brief delay
      setTimeout(() => {
        router.push("/dashboard/technician/my-services");
      }, 1800);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred while adding the service.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl shadow-sm border-border/80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-amber-500" />
          Service Details & Pricing
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Fill in the specifications for your repair service. All fields are required.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          {/* Feedback messages */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 text-xs sm:text-sm font-medium text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Technician Info Banner (Read-Only) */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-semibold text-foreground">Technician: </span>
              <span className="text-muted-foreground">{technician.name}</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Contact Email: </span>
              <span className="text-muted-foreground">{technician.email}</span>
            </div>
          </div>

          {/* Service Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs sm:text-sm font-medium">
              Service Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. iPhone Screen Replacement / Split AC Master Servicing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category & Service Mode (2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                Category
              </Label>
              <Select value={category} onValueChange={(val) => setCategory(val || "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a repair category" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Mode Dropdown */}
            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                Service Mode
              </Label>
              <Select value={serviceMode} onValueChange={(val) => setServiceMode(val || "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select delivery mode" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_MODES.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Base Price & Estimated Duration (2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Base Price */}
            <div className="space-y-1.5">
              <Label htmlFor="basePrice" className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                Starting Price (USD)
              </Label>
              <Input
                id="basePrice"
                name="basePrice"
                type="number"
                step="0.01"
                min="1"
                placeholder="e.g. 35"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                required
              />
              <p className="text-[11px] text-muted-foreground">
                Starting rate displayed on public service cards.
              </p>
            </div>

            {/* Estimated Duration */}
            <div className="space-y-1.5">
              <Label htmlFor="estimatedDuration" className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                Estimated Duration
              </Label>
              <Input
                id="estimatedDuration"
                name="estimatedDuration"
                type="text"
                placeholder="e.g. 2-3 hours / 1 day"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Service Area */}
          <div className="space-y-1.5">
            <Label htmlFor="serviceArea" className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              Service Area
            </Label>
            <Input
              id="serviceArea"
              name="serviceArea"
              type="text"
              placeholder="e.g. Dhanmondi, Mirpur, Gulshan, Dhaka"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              required
            />
          </div>

          {/* Service Banner Image Upload (ImgBB) */}
          <div className="space-y-2">
            <Label htmlFor="serviceImage" className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
              <UploadCloud className="h-3.5 w-3.5 text-muted-foreground" />
              Service Banner Image (ImgBB)
            </Label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-dashed border-border/80 rounded-xl bg-muted/20">
              {imagePreview ? (
                <div className="relative h-28 w-44 rounded-lg border border-border overflow-hidden shrink-0 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Banner Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs gap-1 cursor-pointer"
                    title="Change Banner"
                  >
                    <X className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                </div>
              ) : (
                <div className="h-28 w-44 rounded-lg border border-border/60 bg-muted/50 flex flex-col items-center justify-center shrink-0 text-muted-foreground gap-1.5">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-[11px]">No image selected</span>
                </div>
              )}

              <div className="flex-1 space-y-1.5">
                <Input
                  id="serviceImage"
                  name="serviceImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer file:cursor-pointer file:text-xs file:font-semibold file:text-primary file:border-0 file:bg-transparent text-xs"
                  required={!imagePreview}
                />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Upload a high-resolution photo showcasing your repair offering. Supported formats: PNG, JPG, WebP. It will be hosted via ImgBB.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              What this service includes
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detail what is covered in this service (diagnostics, replacement parts, testing, warranty)..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border/40 mt-4">
          <p className="text-xs text-muted-foreground order-2 sm:order-1">
            Status: <span className="font-semibold text-amber-600 dark:text-amber-400">Pending Admin Approval</span>
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="w-1/2 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 sm:w-auto gap-2 shadow-sm font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Submit Service
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

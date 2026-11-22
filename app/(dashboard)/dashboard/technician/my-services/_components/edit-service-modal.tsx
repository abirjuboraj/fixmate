"use client";

import { useState } from "react";
import { Loader2, X, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  SERVICE_CATEGORIES,
  SERVICE_MODES,
  type ServiceItem,
  type UpdateServicePayload,
} from "@/types";
import { updateService } from "@/lib/action/services";
import { uploadImage } from "@/lib/uploadImage";

interface EditServiceModalProps {
  service: ServiceItem;
  onUpdated: (updated: ServiceItem) => void;
  onClose: () => void;
}


export function EditServiceModal({
  service,
  onUpdated,
  onClose,
}: EditServiceModalProps) {

  const [title, setTitle] = useState(service.title);
  const [category, setCategory] = useState(service.category);
  const [serviceMode, setServiceMode] = useState(service.serviceMode);
  const [basePrice, setBasePrice] = useState(String(service.basePrice));
  const [estimatedDuration, setEstimatedDuration] = useState(
    service.estimatedDuration
  );
  const [serviceArea, setServiceArea] = useState(service.serviceArea);
  const [description, setDescription] = useState(service.description);
  // The existing ImgBB URL is kept unless a new local file is chosen.
  const image = service.image;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const isDirty =
    title.trim() !== service.title ||
    category !== service.category ||
    serviceMode !== service.serviceMode ||
    Number(basePrice) !== Number(service.basePrice) ||
    estimatedDuration.trim() !== service.estimatedDuration ||
    serviceArea.trim() !== service.serviceArea ||
    description.trim() !== service.description ||
    imageFile !== null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isDirty) {
      toast.info("No changes were made");
      return;
    }

    if (!title.trim()) {
      setErrorMessage("Please enter a service title.");
      return;
    }
    if (!category) {
      setErrorMessage("Please select a service category.");
      return;
    }
    if (!serviceMode) {
      setErrorMessage("Please select a service mode.");
      return;
    }
    const parsedPrice = parseFloat(basePrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage("Base price must be a positive number greater than 0.");
      return;
    }
    if (!estimatedDuration.trim()) {
      setErrorMessage("Please specify estimated duration.");
      return;
    }
    if (!serviceArea.trim()) {
      setErrorMessage("Please enter the service coverage area.");
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Please enter what the repair service includes.");
      return;
    }
    if (!image && !imageFile) {
      setErrorMessage("Please choose a service image.");
      return;
    }

    setIsSaving(true);

    try {
      // Same upload flow as "Add Service": upload the chosen local file to
      // ImgBB first, otherwise keep the existing image URL.
      let finalImage = image;
      if (imageFile) {
        const uploadResult = await uploadImage(imageFile);
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.message || "Failed to upload image.");
        }
        finalImage = uploadResult.url;
      }

      const payload: UpdateServicePayload = {
        title: title.trim(),
        category,
        serviceMode,
        basePrice: parsedPrice,
        estimatedDuration: estimatedDuration.trim(),
        serviceArea: serviceArea.trim(),
        description: description.trim(),
        image: finalImage,
      };

      const result = await updateService(service._id as string, payload);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to update service");
      }

      toast.success("Service updated!", {
        description: "It is now waiting for admin re-approval.",
      });

      // Give the parent the fresh service doc so the table row updates
      onUpdated(result.data as ServiceItem);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
      toast.error("Failed to update service", {
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {/* stopPropagation: clicks inside the modal must not close it */}
      <div
        className="no-scrollbar w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-border/60 p-4 sm:p-5 sticky top-0 bg-card z-10">
          <div>
            <h2 className="font-bold text-foreground">Edit Service</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Saving will send the service back to admin re-approval.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-5 space-y-4">
            {/* Error message */}
            {errorMessage && (
              <p className="text-xs sm:text-sm font-medium text-destructive bg-destructive/10 rounded-lg border border-destructive/20 px-3 py-2">
                {errorMessage}
              </p>
            )}

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-title">Service Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. iPhone Screen Replacement"
              />
            </div>

            {/* Category & Service Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(val) => setCategory(val || "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
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

              <div className="space-y-1.5">
                <Label>Service Mode</Label>
                <Select
                  value={serviceMode}
                  onValueChange={(val) => setServiceMode(val || "")}
                >
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

            {/* Price & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-price">Base Price (USD)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  min="1"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-duration">Estimated Duration</Label>
                <Input
                  id="edit-duration"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                  placeholder="e.g. 2-3 hours"
                />
              </div>
            </div>

            {/* Service Area */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-area">Service Area</Label>
              <Input
                id="edit-area"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                placeholder="e.g. Dhanmondi, Dhaka"
              />
            </div>

            {/* Banner image — same local file upload as Add Service, with the
                current image shown as a preview when the modal opens. */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-image">Service Banner Image</Label>
              <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 sm:flex-row sm:items-center">
                <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-border/70 bg-muted/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl || image}
                    alt="Current service banner"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer file:cursor-pointer file:text-xs file:font-semibold file:text-primary file:border-0 file:bg-transparent text-xs"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {imageFile
                      ? "New image selected — it will be uploaded when you save."
                      : "Choose a new image to replace the current banner."}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-description">
                What this service includes
              </Label>
              <Textarea
                id="edit-description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex items-center justify-end gap-2.5 border-t border-border/60 p-4 sm:p-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !isDirty}
              className="gap-2"
            >
              {isSaving ? (
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
      </div>
    </div>
  );
}

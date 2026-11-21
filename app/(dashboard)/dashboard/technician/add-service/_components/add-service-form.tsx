"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
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
} from "lucide-react"

import { uploadImage } from "@/lib/uploadImage"
import { SERVICE_CATEGORIES, SERVICE_MODES, AddServicePayload } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addService } from "@/lib/action/services"
import { toast } from "sonner"

interface AddServiceFormProps {
  technician: {
    name: string
    email: string
  }
}

export function AddServiceForm({ technician }: AddServiceFormProps) {
  const router = useRouter()

  // Form input states
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<string>("")
  const [serviceMode, setServiceMode] = useState<string>("")
  const [basePrice, setBasePrice] = useState<string>("")
  const [estimatedDuration, setEstimatedDuration] = useState("")
  const [serviceArea, setServiceArea] = useState("")
  const [description, setDescription] = useState("")

  // File and preview states
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Submission feedback states
  const [isSubmitting, setIsSubmitting] = useState(false)

  
  const isDirty =
    title.trim() !== "" ||
    category !== "" ||
    serviceMode !== "" ||
    basePrice.trim() !== "" ||
    estimatedDuration.trim() !== "" ||
    serviceArea.trim() !== "" ||
    description.trim() !== "" ||
    imageFile !== null

  // Cancel clears the form and stays on the page — no surprise navigation.
  const handleCancel = () => {
    setTitle("")
    setCategory("")
    setServiceMode("")
    setBasePrice("")
    setEstimatedDuration("")
    setServiceArea("")
    setDescription("")
    handleRemoveImage()
    toast.info("Form cleared.")
  }

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
  }

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    if (!title.trim()) {
      toast.error("Please enter a service title.")
      return
    }
    if (!category) {
      toast.error("Please select a service category.")
      return
    }
    if (!serviceMode) {
      toast.error("Please select a service mode (Home Visit or Shop Drop-off).")
      return
    }
    const parsedPrice = parseFloat(basePrice)
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Base price must be a positive number greater than 0.")
      return
    }
    if (!estimatedDuration.trim()) {
      toast.error("Please specify estimated duration (e.g. '2-3 hours' or '1 day').")
      return
    }
    if (!serviceArea.trim()) {
      toast.error("Please enter the service coverage area (e.g. 'Dhanmondi, Dhaka').")
      return
    }
    if (!description.trim()) {
      toast.error("Please enter what the repair service includes.")
      return
    }
    if (!imageFile) {
      toast.error("Please choose a service banner image.")
      return
    }

    setIsSubmitting(true)

    try {
      const uploadResult = await uploadImage(imageFile)

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(
          uploadResult.message || "Failed to upload service image to ImgBB."
        )
      }

      const imageUrl = uploadResult.url

      const servicePayload: AddServicePayload = {
        title: title.trim(),
        category,
        serviceMode,
        basePrice: parsedPrice,
        estimatedDuration: estimatedDuration.trim(),
        serviceArea: serviceArea.trim(),
        description: description.trim(),
        image: imageUrl,
        approvalStatus: "pending",
        isAvailable: true,
      }

      const result = await addService(servicePayload)

      if (!result?.success) {
        throw new Error(
          result?.message || "Failed to create service. Please try again."
        )
      }

      // Show success toast
      toast.success("Service submitted! Waiting for admin approval.")

      // Reset form fields
      setTitle("")
      setCategory("")
      setServiceMode("")
      setBasePrice("")
      setEstimatedDuration("")
      setServiceArea("")
      setDescription("")
      handleRemoveImage()

      // Redirect to my services list after a short delay
      setTimeout(() => {
        router.push("/dashboard/technician/my-services")
      }, 1000)
    } catch (err: unknown) {
      console.error("Add service error:", err)
      const message = err instanceof Error ? err.message : "Failed to publish service. Please try again."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full border-border/80 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Wrench className="h-5 w-5 text-amber-500" />
          Service Details & Pricing
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Fill in the specifications for your repair service. All fields are
          required.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">

          {/* Technician Info Banner (Read-Only) */}
          <div className="flex flex-col justify-between gap-2 rounded-xl border border-border/60 bg-muted/40 p-3.5 text-xs sm:flex-row sm:items-center">
            <div>
              <span className="font-semibold text-foreground">
                Technician:{" "}
              </span>
              <span className="text-muted-foreground">{technician.name}</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">
                Contact Email:{" "}
              </span>
              <span className="text-muted-foreground">{technician.email}</span>
            </div>
          </div>

          {/* Service Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-medium sm:text-sm">
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

          {/* Row 1: Category, Service Mode & Starting Price */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(val) => setCategory(val || "")}
              >
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
              <Label className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
                <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                Service Mode
              </Label>
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

            {/* Starting Price */}
            <div className="space-y-1.5">
              <Label
                htmlFor="basePrice"
                className="flex items-center gap-1.5 text-xs font-medium sm:text-sm"
              >
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
          </div>

          {/* Row 2: Estimated Duration (1/3) & Service Area (2/3) */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {/* Estimated Duration */}
            <div className="space-y-1.5 sm:col-span-1">
              <Label
                htmlFor="estimatedDuration"
                className="flex items-center gap-1.5 text-xs font-medium sm:text-sm"
              >
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

            {/* Service Area */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label
                htmlFor="serviceArea"
                className="flex items-center gap-1.5 text-xs font-medium sm:text-sm"
              >
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
          </div>

          {/* Service Banner Image Upload (ImgBB) */}
          <div className="space-y-2">
            <Label
              htmlFor="serviceImage"
              className="flex items-center gap-1.5 text-xs font-medium sm:text-sm"
            >
              <UploadCloud className="h-3.5 w-3.5 text-muted-foreground" />
              Service Banner Image
            </Label>

            <div className="flex flex-col gap-4 rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 sm:flex-row sm:items-center">
              {imagePreview ? (
                <div className="group relative h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Banner Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute inset-0 flex cursor-pointer items-center justify-center gap-1 bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                    title="Change Banner"
                  >
                    <X className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                </div>
              ) : (
                <div className="flex h-28 w-44 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-muted/50 text-muted-foreground">
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
                  className="cursor-pointer text-xs file:cursor-pointer file:border-0 file:bg-transparent file:text-xs file:font-semibold file:text-primary"
                  required={!imagePreview}
                />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Upload a high-resolution photo showcasing your repair
                  offering. Supported formats: PNG, JPG, JPEG, WebP.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="description"
              className="flex items-center gap-1.5 text-xs font-medium sm:text-sm"
            >
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

        <CardFooter className="mt-4 flex flex-col items-center justify-end  gap-3 border-t border-border/40 pt-6 sm:flex-row">


          <div className="order-1 flex w-full items-center gap-2.5 sm:order-2 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting || !isDirty}
              className="w-1/2 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="w-1/2 gap-2 font-semibold shadow-sm sm:w-auto"
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
  )
}

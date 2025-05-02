"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  providerId: string
  providerName: string
}

export function BookingModal({ isOpen, onClose, providerId, providerName }: BookingModalProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [selectedService, setSelectedService] = useState<string>()
  const [message, setMessage] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Mock services for the provider
  const providerServices = [
    { id: "s1", name: "Basic Home Cleaning", price: 50 },
    { id: "s2", name: "Deep Cleaning", price: 100 },
    { id: "s3", name: "Move-in/Move-out Cleaning", price: 150 },
    { id: "s4", name: "Office Cleaning", price: 80 },
  ]

  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)

      // Limit to 5 images total
      const totalImages = [...images, ...newFiles].slice(0, 5)
      setImages(totalImages)

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls].slice(0, 5))
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviewUrls = [...imagePreviewUrls]
    URL.revokeObjectURL(newPreviewUrls[index]) // Clean up the URL
    newPreviewUrls.splice(index, 1)
    setImagePreviewUrls(newPreviewUrls)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !time || !selectedService) {
      toast({
        title: "Missing information",
        description: "Please select a date, time, and service.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would submit the booking to your API
      // const formData = new FormData()
      // formData.append('providerId', providerId)
      // formData.append('serviceId', selectedService)
      // formData.append('date', date.toISOString())
      // formData.append('time', time)
      // formData.append('message', message)
      // images.forEach(image => formData.append('images', image))
      // await axios.post('/api/bookings', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Booking request sent!",
        description: `Your booking with ${providerName} has been submitted successfully.`,
      })

      // Reset form and close modal
      setDate(undefined)
      setTime(undefined)
      setSelectedService(undefined)
      setMessage("")
      setImages([])
      setImagePreviewUrls([])
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book with {providerName}</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a booking with this service provider.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service">Select Service</Label>
            <RadioGroup value={selectedService} onValueChange={setSelectedService}>
              {providerServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between space-x-2 border rounded-md p-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={service.id} id={`service-${service.id}`} />
                    <Label htmlFor={`service-${service.id}`} className="font-normal">
                      {service.name}
                    </Label>
                  </div>
                  <span className="font-medium">${service.price}/hr</span>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) =>
                    date < new Date() || date < new Date(new Date().setDate(new Date().getDate() - 1))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time">Select Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select time">
                  {time ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  ) : (
                    "Select time"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Describe what you need help with..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Upload Images (Optional)</Label>
            <div className="border border-dashed rounded-md p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative w-16 h-16">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-1 py-2">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {images.length === 0 ? "Upload images" : "Add more images"}
                    </span>
                    <span className="text-xs text-muted-foreground">{images.length}/5 (Max 5 images)</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={images.length >= 5}
                  />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book Now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

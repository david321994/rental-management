"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Upload, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AddProperty() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [size, setSize] = useState("")
  const [bedrooms, setBedrooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, we would upload the file to a server
      // For this demo, we'll just create a placeholder URL
      const newImages = [...images]
      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push(URL.createObjectURL(e.target.files[i]))
      }
      setImages(newImages)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to add the property
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "הנכס נוסף",
        description: "הנכס שלך נוסף בהצלחה.",
      })

      router.push("/landlord/dashboard")
    } catch (error) {
      toast({
        title: "ההוספה נכשלה",
        description: "הייתה בעיה בהוספת הנכס שלך. אנא נסה שוב.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/landlord/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ChevronLeft className="ml-1 h-4 w-4" />
          חזרה ללוח הבקרה
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">הוספת נכס חדש</h1>
        <p className="text-gray-500">הזן את פרטי נכס ההשכרה החדש שלך</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>פרטי הנכס</CardTitle>
            <CardDescription>מידע בסיסי על נכס ההשכרה שלך</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">שם הנכס</Label>
              <Input
                id="name"
                placeholder="לדוגמה: סטודיו במרכז העיר"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">כתובת</Label>
              <Input
                id="address"
                placeholder="כתובת מלאה של הנכס"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">תיאור</Label>
              <Textarea
                id="description"
                placeholder="תאר את הנכס שלך..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="propertyType">סוג נכס</Label>
                <Select value={propertyType} onValueChange={setPropertyType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר סוג נכס" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">דירה</SelectItem>
                    <SelectItem value="house">בית</SelectItem>
                    <SelectItem value="condo">קונדו</SelectItem>
                    <SelectItem value="studio">סטודיו</SelectItem>
                    <SelectItem value="other">אחר</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">גודל (מ"ר)</Label>
                <Input
                  id="size"
                  type="text"
                  placeholder="לדוגמה: 75"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">חדרי שינה</Label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="bedrooms"
                    type="number"
                    className="mx-2 text-center"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number.parseInt(e.target.value) || 0)}
                    min="0"
                    required
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => setBedrooms(bedrooms + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">חדרי אמבטיה</Label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setBathrooms(Math.max(0.5, bathrooms - 0.5))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="bathrooms"
                    type="number"
                    className="mx-2 text-center"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number.parseFloat(e.target.value) || 0)}
                    min="0.5"
                    step="0.5"
                    required
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => setBathrooms(bathrooms + 0.5)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>תמונות הנכס</Label>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`תמונת נכס ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center justify-center h-32 border border-dashed rounded-md">
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center p-4">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">העלה תמונה</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
              <p className="text-xs text-gray-500">העלה תמונות של הנכס שלך כדי למשוך שוכרים פוטנציאליים.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              ביטול
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "מוסיף נכס..." : "הוסף נכס"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

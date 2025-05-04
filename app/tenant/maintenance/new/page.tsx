"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ReportMaintenanceIssue() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("medium")
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
        if (newImages.length < 3) {
          // Limit to 3 images
          newImages.push(URL.createObjectURL(e.target.files[i]))
        }
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
      // In a real app, this would be an API call to submit the maintenance request
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "בקשת התחזוקה נשלחה",
        description: "הבקשה שלך נשלחה למשכיר.",
      })

      router.push("/tenant/dashboard")
    } catch (error) {
      toast({
        title: "השליחה נכשלה",
        description: "הייתה בעיה בשליחת הבקשה שלך. אנא נסה שוב.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/tenant/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ChevronLeft className="ml-1 h-4 w-4" />
          חזרה ללוח הבקרה
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">דיווח על בעיית תחזוקה</h1>
        <p className="text-gray-500">שלח בקשת תחזוקה חדשה עבור הנכס המושכר שלך</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>פרטי בקשת התחזוקה</CardTitle>
            <CardDescription>אנא ספק כמה שיותר פרטים כדי לעזור לנו לטפל בבעיה שלך במהירות</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">כותרת הבעיה</Label>
              <Input
                id="title"
                placeholder="לדוגמה: ברז דולף בחדר האמבטיה"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">קטגוריה</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">אינסטלציה</SelectItem>
                  <SelectItem value="electrical">חשמל</SelectItem>
                  <SelectItem value="appliance">מכשירי חשמל</SelectItem>
                  <SelectItem value="heating_cooling">חימום/קירור</SelectItem>
                  <SelectItem value="structural">מבנה</SelectItem>
                  <SelectItem value="other">אחר</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">תיאור</Label>
              <Textarea
                id="description"
                placeholder="אנא תאר את הבעיה בפירוט..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>עדיפות</Label>
              <RadioGroup value={priority} onValueChange={setPriority} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="cursor-pointer mr-2">
                    נמוכה
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="cursor-pointer mr-2">
                    בינונית
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="cursor-pointer mr-2">
                    גבוהה
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>תמונות (אופציונלי)</Label>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`תמונת בעיה ${index + 1}`}
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
                {images.length < 3 && (
                  <div className="flex items-center justify-center h-32 border border-dashed rounded-md">
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center p-4">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">העלה תמונה</span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">ניתן להעלות עד 3 תמונות כדי לעזור להמחיש את הבעיה.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              ביטול
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "שולח..." : "שלח בקשה"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

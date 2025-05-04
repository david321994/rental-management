"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Determine if user is landlord or tenant based on email
      // This is just for demo - in a real app, the backend would return the role
      const isLandlord = email.includes("landlord")

      toast({
        title: "התחברות הצליחה",
        description: "ברוך שובך לנכסים קלים!",
      })

      // Redirect based on role
      if (isLandlord) {
        router.push("/landlord/dashboard")
      } else {
        router.push("/tenant/dashboard")
      }
    } catch (error) {
      toast({
        title: "התחברות נכשלה",
        description: "אנא בדוק את פרטי ההתחברות שלך ונסה שוב.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
            <Building className="h-6 w-6" />
            <span>נכסים קלים</span>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">התחברות</CardTitle>
            <CardDescription className="text-center">הזן את פרטי ההתחברות שלך כדי לגשת לחשבונך</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">דוא"ל</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="הכנס את כתובת הדוא״ל שלך"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">סיסמה</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    שכחת סיסמה?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="הכנס את הסיסמה שלך"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "הסתר סיסמה" : "הצג סיסמה"}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "מתחבר..." : "התחברות"}
              </Button>
              <div className="text-center text-sm">
                אין לך חשבון?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  הרשם
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

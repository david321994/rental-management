"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Building,
  Home,
  FileText,
  MessageSquare,
  Wrench,
  Bell,
  User,
  LogOut,
  DollarSign,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// Mock data for demonstration
const property = {
  id: 1,
  name: "סטודיו במרכז העיר",
  address: "שדרות רוטשילד 45, תל אביב",
  landlord: "יוסי ישראלי",
  landlordPhone: "050-1234567",
  image: "/placeholder.svg?height=200&width=400",
  leaseEnd: "2023-12-31",
  rentAmount: 4500,
  rentDueDay: 1,
  rentStatus: "paid",
}

const maintenanceIssues = [
  {
    id: 1,
    title: "ברז דולף בחדר האמבטיה",
    status: "in_progress",
    date: "2023-05-15",
    description: "הברז בכיור האמבטיה דולף באופן קבוע.",
    updates: [
      { date: "15/05/2023", message: "הבעיה דווחה" },
      { date: "16/05/2023", message: "המשכיר אישר את הבעיה" },
      { date: "17/05/2023", message: "שרברב מתוזמן למחר" },
    ],
  },
  {
    id: 2,
    title: "מזגן לא מקרר",
    status: "pending",
    date: "2023-05-18",
    description: "המזגן פועל אבל לא מקרר את הסלון.",
    updates: [{ date: "18/05/2023", message: "הבעיה דווחה" }],
  },
]

const messages = [
  {
    id: 1,
    sender: "יוסי ישראלי",
    message: "אני אעבור מחר לבדוק את מערכת החימום. האם השעה 14:00 מתאימה?",
    time: "אתמול בשעה 15:45",
    isLandlord: true,
  },
  {
    id: 2,
    sender: "את/ה",
    message: "14:00 מתאים לי. נתראה מחר!",
    time: "אתמול בשעה 16:00",
    isLandlord: false,
  },
]

export default function TenantDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = () => {
    toast({
      title: "התנתקת",
      description: "התנתקת בהצלחה מהמערכת.",
    })
    router.push("/")
  }

  // Calculate days until rent is due
  const today = new Date()
  const nextRentDate = new Date(today.getFullYear(), today.getMonth(), property.rentDueDay)
  if (nextRentDate < today) {
    nextRentDate.setMonth(nextRentDate.getMonth() + 1)
  }
  const daysUntilRent = Math.ceil((nextRentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Calculate days until lease ends
  const leaseEndDate = new Date(property.leaseEnd)
  const daysUntilLeaseEnd = Math.ceil((leaseEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-l">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
            <Building className="h-6 w-6" />
            <span>נכסים קלים</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/tenant/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "overview" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <Home className="h-4 w-4" />
              לוח בקרה
            </Link>
            <Link
              href="/tenant/lease"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "lease" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("lease")}
            >
              <FileText className="h-4 w-4" />
              חוזה
            </Link>
            <Link
              href="/tenant/payments"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "payments" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("payments")}
            >
              <DollarSign className="h-4 w-4" />
              תשלומים
            </Link>
            <Link
              href="/tenant/maintenance"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "maintenance" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("maintenance")}
            >
              <Wrench className="h-4 w-4" />
              תחזוקה
            </Link>
            <Link
              href="/tenant/messages"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "messages" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="h-4 w-4" />
              הודעות
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-4 py-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>שכ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">שרה כהן</span>
              <span className="text-xs text-gray-500">sarah@example.com</span>
            </div>
          </div>
          <div className="grid gap-1 pt-2">
            <Link href="/tenant/profile">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                פרופיל
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              התנתק
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
          <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Building className="h-6 w-6" />
              <span>נכסים קלים</span>
            </Link>
          </div>
          <div className="mr-auto flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">התראות</span>
            </Button>
            <Avatar className="md:hidden">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>שכ</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="grid gap-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">הנכס שלי</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">מצב שכירות</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">₪{property.rentAmount}</div>
                  {property.rentStatus === "paid" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      שולם
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      לתשלום
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {property.rentStatus === "paid" ? "התשלום הבא בעוד 30 יום" : `לתשלום בעוד ${daysUntilRent} ימים`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">מצב חוזה</CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">פעיל</div>
                <p className="text-xs text-gray-500">
                  {daysUntilLeaseEnd > 0 ? `יסתיים בעוד ${daysUntilLeaseEnd} ימים` : "פג תוקף"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">בעיות תחזוקה</CardTitle>
                <Wrench className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{maintenanceIssues.length}</div>
                <p className="text-xs text-gray-500">
                  {maintenanceIssues.filter((issue) => issue.status === "in_progress").length} בטיפול,{" "}
                  {maintenanceIssues.filter((issue) => issue.status === "pending").length} ממתינות
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>פרטי הנכס</CardTitle>
              <CardDescription>מידע על הנכס המושכר שלך</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div>
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{property.name}</h3>
                  <p className="text-sm text-gray-500">{property.address}</p>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">משכיר</span>
                    <span className="text-sm">{property.landlord}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">טלפון</span>
                    <span className="text-sm">{property.landlordPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">סיום חוזה</span>
                    <span className="text-sm">{new Date(property.leaseEnd).toLocaleDateString("he-IL")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">שכירות חודשית</span>
                    <span className="text-sm">₪{property.rentAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">תאריך תשלום</span>
                    <span className="text-sm">{property.rentDueDay} לכל חודש</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="maintenance" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="maintenance">בעיות תחזוקה</TabsTrigger>
              <TabsTrigger value="messages">הודעות אחרונות</TabsTrigger>
            </TabsList>
            <TabsContent value="maintenance" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>בעיות תחזוקה</CardTitle>
                    <CardDescription>עקוב אחר מצב בקשות התחזוקה שלך</CardDescription>
                  </div>
                  <Link href="/tenant/maintenance/new">
                    <Button>דווח על בעיה</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceIssues.length > 0 ? (
                      maintenanceIssues.map((issue) => (
                        <div key={issue.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{issue.title}</h3>
                            {issue.status === "pending" && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                ממתין
                              </Badge>
                            )}
                            {issue.status === "in_progress" &&
                              (
                                <Badge variant="outline" className="bg-blue-50 text-blue  && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                בטיפול
                              </Badge>
                              )}
                            {issue.status === "completed" && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                הושלם
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            \ דווח בתאריך {new Date(issue.date).toLocaleDateString("he-IL")}
                          </p>
                          <p className="mt-2 text-sm">{issue.description}</p>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium">עדכונים</h4>
                            <div className="mt-2 space-y-2">
                              {issue.updates.map((update, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                  <div className="h-2 w-2 mt-1.5 rounded-full bg-primary"></div>
                                  <div>
                                    <span className="font-medium">{update.date}: </span>
                                    {update.message}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Link href={`/tenant/maintenance/${issue.id}`}>
                              <Button variant="outline" size="sm">
                                צפה בפרטים
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium">אין בעיות תחזוקה</h3>
                        <p className="mt-1 text-sm text-gray-500">אין לך בעיות תחזוקה מדווחות.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="messages" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>הודעות אחרונות</CardTitle>
                    <CardDescription>תקשורת עם המשכיר שלך</CardDescription>
                  </div>
                  <Link href="/tenant/messages">
                    <Button>שלח הודעה</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${message.isLandlord ? "justify-start" : "justify-end"}`}
                      >
                        {message.isLandlord && (
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={message.sender} />
                            <AvatarFallback>יי</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-4 max-w-[80%] ${
                            message.isLandlord ? "bg-gray-100" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium">{message.sender}</span>
                            <span className="text-xs opacity-70">{message.time}</span>
                          </div>
                          <p className="mt-1">{message.message}</p>
                        </div>
                        {!message.isLandlord && (
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                            <AvatarFallback>שכ</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href="/tenant/messages" className="w-full">
                    <Button variant="outline" className="w-full">
                      צפה בכל ההודעות
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

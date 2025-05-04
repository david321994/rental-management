"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, Home, FileText, MessageSquare, Wrench, Bell, User, LogOut, Plus, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// Mock data for demonstration
const properties = [
  {
    id: 1,
    name: "דירת חוף הים",
    address: "רחוב הים 123, תל אביב",
    tenant: "דוד כהן",
    rentStatus: "paid",
    maintenanceIssues: 0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "סטודיו במרכז העיר",
    address: "שדרות רוטשילד 45, תל אביב",
    tenant: "שרה לוי",
    rentStatus: "late",
    maintenanceIssues: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "דירת גן",
    address: "רחוב הרצל 78, ירושלים",
    tenant: "משה לוי",
    rentStatus: "pending",
    maintenanceIssues: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "דירה עם נוף להרים",
    address: "רחוב הכרמל 15, חיפה",
    tenant: null,
    rentStatus: "vacant",
    maintenanceIssues: 0,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const notifications = [
  {
    id: 1,
    message: "שרה לוי דיווחה על בעיית תחזוקה חדשה",
    time: "לפני 10 דקות",
    type: "maintenance",
  },
  {
    id: 2,
    message: "התקבל תשלום שכירות מדוד כהן",
    time: "לפני שעתיים",
    type: "payment",
  },
  {
    id: 3,
    message: "חוזה השכירות לסטודיו במרכז העיר יפוג בעוד 30 יום",
    time: "לפני יום",
    type: "lease",
  },
]

export default function LandlordDashboard() {
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
              href="/landlord/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "overview" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <Home className="h-4 w-4" />
              לוח בקרה
            </Link>
            <Link
              href="/landlord/properties"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "properties" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("properties")}
            >
              <Building className="h-4 w-4" />
              נכסים
            </Link>
            <Link
              href="/landlord/leases"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "leases" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("leases")}
            >
              <FileText className="h-4 w-4" />
              חוזים
            </Link>
            <Link
              href="/landlord/payments"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "payments" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("payments")}
            >
              <DollarSign className="h-4 w-4" />
              תשלומים
            </Link>
            <Link
              href="/landlord/maintenance"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeTab === "maintenance" ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("maintenance")}
            >
              <Wrench className="h-4 w-4" />
              תחזוקה
            </Link>
            <Link
              href="/landlord/messages"
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
              <AvatarFallback>יי</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">יוסי ישראלי</span>
              <span className="text-xs text-gray-500">yossi@example.com</span>
            </div>
          </div>
          <div className="grid gap-1 pt-2">
            <Link href="/landlord/profile">
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
              <AvatarFallback>יי</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="grid gap-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">לוח בקרה</h1>
            <Link href="/landlord/properties/add">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                הוסף נכס
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">סה"כ נכסים</CardTitle>
                <Building className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{properties.length}</div>
                <p className="text-xs text-gray-500">
                  {properties.filter((p) => p.tenant).length} מאוכלסים, {properties.filter((p) => !p.tenant).length}{" "}
                  פנויים
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">גביית שכירות</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₪15,500</div>
                <p className="text-xs text-gray-500">
                  {properties.filter((p) => p.rentStatus === "paid").length} שולמו,{" "}
                  {properties.filter((p) => p.rentStatus === "late").length} באיחור
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">בעיות תחזוקה</CardTitle>
                <Wrench className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {properties.reduce((acc, prop) => acc + prop.maintenanceIssues, 0)}
                </div>
                <p className="text-xs text-gray-500">
                  {properties.filter((p) => p.maintenanceIssues > 0).length} נכסים מושפעים
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="properties">נכסים</TabsTrigger>
              <TabsTrigger value="notifications">התראות</TabsTrigger>
              <TabsTrigger value="upcoming">קרובים</TabsTrigger>
            </TabsList>
            <TabsContent value="properties" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{property.name}</CardTitle>
                      <CardDescription>{property.address}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">שוכר</p>
                          <p className="text-sm text-gray-500">{property.tenant || "פנוי"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {property.rentStatus === "paid" && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              שולם
                            </Badge>
                          )}
                          {property.rentStatus === "pending" && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              ממתין
                            </Badge>
                          )}
                          {property.rentStatus === "late" && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              באיחור
                            </Badge>
                          )}
                          {property.rentStatus === "vacant" && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              פנוי
                            </Badge>
                          )}
                          {property.maintenanceIssues > 0 && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              {property.maintenanceIssues} בעיות
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Link href={`/landlord/properties/${property.id}`}>
                          <Button variant="outline" size="sm">
                            צפה בפרטים
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>התראות אחרונות</CardTitle>
                  <CardDescription>הישאר מעודכן עם הפעילויות האחרונות</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="rounded-full p-2 bg-primary/10">
                          {notification.type === "maintenance" && <Wrench className="h-4 w-4 text-primary" />}
                          {notification.type === "payment" && <DollarSign className="h-4 w-4 text-primary" />}
                          {notification.type === "lease" && <FileText className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>אירועים קרובים</CardTitle>
                  <CardDescription>חידושי חוזים, תשלומים ותחזוקה מתוכננת</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full p-2 bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">חידוש חוזה - סטודיו במרכז העיר</p>
                        <p className="text-xs text-gray-500">בעוד 30 ימים</p>
                      </div>
                      <Button variant="outline" size="sm">
                        חדש
                      </Button>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full p-2 bg-primary/10">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">תשלום שכירות - דירת גן</p>
                        <p className="text-xs text-gray-500">בעוד 5 ימים</p>
                      </div>
                      <Button variant="outline" size="sm">
                        תזכורת
                      </Button>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full p-2 bg-primary/10">
                        <Wrench className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">תחזוקה מתוכננת - סטודיו במרכז העיר</p>
                        <p className="text-xs text-gray-500">מחר בשעה 10:00</p>
                      </div>
                      <Button variant="outline" size="sm">
                        תזמן מחדש
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

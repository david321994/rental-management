"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Edit,
  Trash2,
  User,
  FileText,
  MessageSquare,
  Calendar,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const property = {
  id: 2,
  name: "סטודיו במרכז העיר",
  address: "שדרות רוטשילד 45, תל אביב",
  description: "דירת סטודיו מודרנית בלב תל אביב, קרובה למסעדות ולתחבורה ציבורית.",
  type: "דירה",
  size: "45 מ״ר",
  bedrooms: 0,
  bathrooms: 1,
  tenant: {
    id: 1,
    name: "שרה לוי",
    email: "sarah@example.com",
    phone: "050-9876543",
    moveInDate: "2023-01-01",
  },
  lease: {
    id: 1,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    rentAmount: 4500,
    securityDeposit: 9000,
    paymentDay: 1,
    status: "active",
  },
  payments: [
    {
      id: 1,
      month: "מאי 2023",
      amount: 4500,
      dueDate: "2023-05-01",
      paidDate: "2023-05-01",
      status: "paid",
      method: "כרטיס אשראי",
    },
    {
      id: 2,
      month: "אפריל 2023",
      amount: 4500,
      dueDate: "2023-04-01",
      paidDate: "2023-04-03",
      status: "paid",
      method: "העברה בנקאית",
    },
    {
      id: 3,
      month: "מרץ 2023",
      amount: 4500,
      dueDate: "2023-03-01",
      paidDate: "2023-03-01",
      status: "paid",
      method: "כרטיס אשראי",
    },
  ],
  maintenanceIssues: [
    {
      id: 1,
      title: "ברז דולף בחדר האמבטיה",
      status: "in_progress",
      priority: "medium",
      reportedDate: "2023-05-15",
      description: "הברז בכיור האמבטיה דולף באופן קבוע.",
      assignedTo: "שרברב - דוד",
      scheduledDate: "2023-05-20",
    },
    {
      id: 2,
      title: "מזגן לא מקרר",
      status: "pending",
      priority: "high",
      reportedDate: "2023-05-18",
      description: "המזגן פועל אבל לא מקרר את הסלון.",
      assignedTo: null,
      scheduledDate: null,
    },
  ],
  messages: [
    {
      id: 1,
      sender: "משכיר",
      message: "אני אעבור מחר לבדוק את מערכת החימום. האם השעה 14:00 מתאימה?",
      timestamp: "2023-05-18T15:45:00",
    },
    {
      id: 2,
      sender: "שוכר",
      message: "14:00 מתאים לי. נתראה מחר!",
      timestamp: "2023-05-18T16:00:00",
    },
  ],
  images: [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ],
}

export default function PropertyDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("info")
  const router = useRouter()
  const { toast } = useToast()

  const handleDeleteProperty = () => {
    toast({
      title: "הנכס נמחק",
      description: "הנכס נמחק בהצלחה.",
    })
    router.push("/landlord/dashboard")
  }

  const handleMarkAsPaid = (paymentId: number) => {
    toast({
      title: "התשלום סומן כשולם",
      description: "התשלום סומן בהצלחה כשולם.",
    })
  }

  const handleSendReminder = () => {
    toast({
      title: "תזכורת נשלחה",
      description: "תזכורת תשלום נשלחה לשוכר.",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/landlord/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ChevronLeft className="ml-1 h-4 w-4" />
          חזרה ללוח הבקרה
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{property.name}</h1>
          <p className="text-gray-500">{property.address}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/landlord/properties/${params.id}/edit`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              ערוך נכס
            </Button>
          </Link>
          <Button variant="destructive" className="flex items-center gap-2" onClick={handleDeleteProperty}>
            <Trash2 className="h-4 w-4" />
            מחק
          </Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="info">מידע</TabsTrigger>
          <TabsTrigger value="tenant">שוכר</TabsTrigger>
          <TabsTrigger value="lease">חוזה</TabsTrigger>
          <TabsTrigger value="payments">תשלומים</TabsTrigger>
          <TabsTrigger value="maintenance">תחזוקה</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>פרטי הנכס</CardTitle>
                <CardDescription>מידע בסיסי על הנכס</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">סוג</p>
                    <p className="text-sm text-gray-500">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">גודל</p>
                    <p className="text-sm text-gray-500">{property.size}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">חדרי שינה</p>
                    <p className="text-sm text-gray-500">{property.bedrooms} (סטודיו)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">חדרי אמבטיה</p>
                    <p className="text-sm text-gray-500">{property.bathrooms}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">תיאור</p>
                  <p className="text-sm text-gray-500">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>תמונות הנכס</CardTitle>
                <CardDescription>תמונות של הנכס</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`תמונת נכס ${index + 1}`}
                      className="aspect-video rounded-md object-cover"
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="ml-2 h-4 w-4" />
                  הוסף תמונות נוספות
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tenant" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>פרטי השוכר</CardTitle>
              <CardDescription>פרטי השוכר הנוכחי</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={property.tenant.name} />
                  <AvatarFallback>
                    {property.tenant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{property.tenant.name}</h3>
                  <p className="text-sm text-gray-500">
                    שוכר מאז {new Date(property.tenant.moveInDate).toLocaleDateString("he-IL")}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">דוא"ל</p>
                  <p className="text-sm text-gray-500">{property.tenant.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">טלפון</p>
                  <p className="text-sm text-gray-500">{property.tenant.phone}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">תקשורת אחרונה</h4>
                <div className="space-y-4">
                  {property.messages.map((message) => (
                    <div key={message.id} className="rounded-lg border p-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleString("he-IL")}
                        </span>
                      </div>
                      <p className="mt-2 text-sm">{message.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/landlord/messages/${property.tenant.id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  שלח הודעה לשוכר
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                צפה בפרופיל מלא
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="lease" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>הסכם שכירות</CardTitle>
              <CardDescription>פרטי החוזה הנוכחי</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">חוזה פעיל</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(property.lease.startDate).toLocaleDateString("he-IL")} עד{" "}
                    {new Date(property.lease.endDate).toLocaleDateString("he-IL")}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">פעיל</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">שכירות חודשית</p>
                  <p className="text-lg">₪{property.lease.rentAmount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">פיקדון ביטחון</p>
                  <p className="text-lg">₪{property.lease.securityDeposit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">יום תשלום</p>
                  <p className="text-lg">{property.lease.paymentDay} לכל חודש</p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <h4 className="font-medium">מסמך חוזה</h4>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">חוזה_שכירות_סטודיו_מרכז_העיר.pdf</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      צפה
                    </Button>
                    <Button variant="outline" size="sm">
                      הורד
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                ערוך חוזה
              </Button>
              <Button className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                חדש חוזה
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>היסטוריית תשלומים</CardTitle>
                <CardDescription>עקוב אחר תשלומי השכירות עבור נכס זה</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2" onClick={handleSendReminder}>
                  <Calendar className="h-4 w-4" />
                  שלח תזכורת
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  הוסף תשלום
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {property.payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      {payment.status === "paid" ? (
                        <div className="rounded-full bg-green-100 p-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      ) : payment.status === "pending" ? (
                        <div className="rounded-full bg-yellow-100 p-2">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-red-100 p-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{payment.month}</h3>
                        <p className="text-sm text-gray-500">
                          לתשלום: {new Date(payment.dueDate).toLocaleDateString("he-IL")}
                          {payment.paidDate && ` • שולם: ${new Date(payment.paidDate).toLocaleDateString("he-IL")}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">₪{payment.amount}</p>
                        <p className="text-sm text-gray-500">{payment.method || "לא שולם"}</p>
                      </div>
                      {payment.status === "paid" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">שולם</Badge>
                      ) : payment.status === "pending" ? (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ממתין</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">באיחור</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                צפה בכל התשלומים
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>בעיות תחזוקה</CardTitle>
                <CardDescription>עקוב ונהל בקשות תחזוקה</CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                הוסף בעיה
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {property.maintenanceIssues.map((issue) => (
                  <div key={issue.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{issue.title}</h3>
                      <div className="flex items-center gap-2">
                        {issue.priority === "high" && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">עדיפות גבוהה</Badge>
                        )}
                        {issue.priority === "medium" && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">עדיפות בינונית</Badge>
                        )}
                        {issue.priority === "low" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">עדיפות נמוכה</Badge>
                        )}
                        {issue.status === "pending" && (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">ממתין</Badge>
                        )}
                        {issue.status === "in_progress" && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">בטיפול</Badge>
                        )}
                        {issue.status === "completed" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">הושלם</Badge>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      דווח בתאריך {new Date(issue.reportedDate).toLocaleDateString("he-IL")}
                    </p>
                    <p className="mt-2 text-sm">{issue.description}</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium">הוקצה ל</p>
                        <p className="text-sm text-gray-500">{issue.assignedTo || "לא הוקצה"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">תאריך מתוזמן</p>
                        <p className="text-sm text-gray-500">
                          {issue.scheduledDate
                            ? new Date(issue.scheduledDate).toLocaleDateString("he-IL")
                            : "לא מתוזמן"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link href={`/landlord/maintenance/${issue.id}`}>
                        <Button variant="outline" size="sm">
                          נהל בעיה
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                צפה בכל בעיות התחזוקה
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

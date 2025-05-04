import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Home, Key, Wrench } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <Building className="h-6 w-6" />
            <span>נכסים קלים</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">התחברות</Button>
            </Link>
            <Link href="/register">
              <Button>הרשמה</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  פשט את ניהול נכסי ההשכרה שלך
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  חיבור בין משכירים ושוכרים בפלטפורמה אחת חלקה. נהל נכסים, חוזים, תשלומים ותחזוקה בקלות.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register?role=landlord">
                  <Button size="lg">אני משכיר</Button>
                </Link>
                <Link href="/register?role=tenant">
                  <Button size="lg" variant="outline">
                    אני שוכר
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Building className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">ניהול נכסים</h3>
                <p className="text-gray-500">
                  נהל מספר בלתי מוגבל של נכסים תחת חשבון אחד. הוסף פרטים, תמונות ועקוב אחר תפוסה.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Key className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">חוזים דיגיטליים</h3>
                <p className="text-gray-500">צור, ערוך וחתום על הסכמי שכירות באופן דיגיטלי. אחסן וגש אליהם בכל עת.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Home className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">תשלומי שכירות</h3>
                <p className="text-gray-500">
                  עקוב אחר תשלומי שכירות, שלח תזכורות ואפשר תשלומים מקוונים עם חשבונות פרימיום.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Wrench className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">בקשות תחזוקה</h3>
                <p className="text-gray-500">דווח ועקוב אחר בעיות תחזוקה. תאם תיקונים ושמור על כולם מעודכנים.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  מוכן לפשט את ניהול ההשכרה שלך?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  הצטרף לאלפי משכירים ושוכרים שכבר משתמשים בפלטפורמה שלנו.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg">התחל בחינם</Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    צפה במחירים
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Building className="h-5 w-5" />
            <span>נכסים קלים</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">© 2023 נכסים קלים. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              תנאים
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              פרטיות
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              צור קשר
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  ShoppingCart,
  Calendar,
  MessageSquare,
  FolderTree,
  Settings,
  Star,
  Package2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      icon: BarChart3,
      title: "Dashboard",
    },
    {
      href: "/admin/users",
      icon: Users,
      title: "Users",
    },
    {
      href: "/admin/services",
      icon: ShoppingCart,
      title: "Services",
    },
    {
      href: "/admin/bookings",
      icon: Calendar,
      title: "Bookings",
    },
    {
      href: "/admin/reviews",
      icon: Star,
      title: "Reviews",
    },
    {
      href: "/admin/categories",
      icon: FolderTree,
      title: "Categories",
    },
    {
      href: "/admin/messages",
      icon: MessageSquare,
      title: "Messages",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <div className="flex h-full max-h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => (
            <Button
              key={route.href}
              asChild
              variant="ghost"
              className={cn(
                "flex h-9 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground",
                pathname === route.href && "bg-muted font-medium text-foreground",
              )}
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {route.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Return to Site</Link>
        </Button>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuthStore } from "@/lib/stores/auth-store"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthForm from "./auth/AuthForm";
import ServiceProviderRegistration from "./auth/ServiceProviderRegistration"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const routes = [
    { href: "/user", label: "Home" },
    { href: "/user/services", label: "Services" },
    { href: "/user/providers", label: "Providers" },
    { href: "/user/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-between px-4">
        <div className="mr-4 hidden md:flex ">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">ServiceMate</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={
                  pathname === route.href
                    ? "text-foreground"
                    : "text-foreground/60 transition-colors hover:text-foreground"
                }
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl">ServiceHub</span>
            </Link>
            <nav className="mt-8 flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={
                    pathname === route.href
                      ? "text-foreground"
                      : "text-foreground/60 transition-colors hover:text-foreground"
                  }
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Login Button */}
                <Button variant="ghost" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
                <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
                  <DialogTrigger asChild />
                  <DialogContent className="max-w-md">
                    <AuthForm />
                  </DialogContent>
                </Dialog>

                {/* Register as Service Provider Button */}
                <Button variant="ghost" onClick={() => setRegisterOpen(true)}>
                  Register as Service Provider
                </Button>
                <Dialog open={isRegisterOpen} onOpenChange={setRegisterOpen}>
                  <DialogTrigger asChild />
                  <DialogContent className="max-w-md">
                    <ServiceProviderRegistration />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

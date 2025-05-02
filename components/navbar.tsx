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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const routes = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/providers", label: "Providers" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">ServiceHub</span>
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

        <div className="flex flex-1 items-center justify-end space-x-4">
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
              {/* Login Button that triggers the modal */}
              <Button variant="ghost" onClick={openModal}>
                Login
              </Button>
        
              {/* Modal Dialog */}
              <Dialog open={isModalOpen} onOpenChange={closeModal}>
                <DialogTrigger asChild>
                  {/* This button doesn't do anything; it's here to allow the dialog to be controlled by state */}
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <AuthForm />
                </DialogContent>
              </Dialog>
        
              {/* Sign Up Button (optional) */}
              <Button variant="ghost" onClick={openModal}>
                Register as Service Provider
              </Button>

               {/* Modal Dialog */}
               <Dialog open={isModalOpen} onOpenChange={closeModal}>
                <DialogTrigger asChild>
                  {/* This button doesn't do anything; it's here to allow the dialog to be controlled by state */}
                </DialogTrigger>
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

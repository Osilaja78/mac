"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, BookOpen, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import Logo from '@/public/images/logo-bg.jpeg';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image className="h-8 w-8 text-primary" src={Logo} alt='logo' />
          <span className="font-poppins font-bold text-xl">Mother&apos;s Aid Schools</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="nav-link font-medium">Home</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link flex items-center font-medium">
              About <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/about/history" className="w-full">Our History</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about/mission" className="w-full">Mission & Vision</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about/staff" className="w-full">Staff & Faculty</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link flex items-center font-medium">
              Academics <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/academics" className="w-full">Our Curriculum</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/beyond-classroom" className="w-full">Beyond Classroom</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* <Link href="/academics" className="nav-link font-medium">Academics</Link> */}
          <Link href="/admissions" className="nav-link font-medium">Admissions</Link>
          <Link href="/news" className="nav-link font-medium">News & Events</Link>
          <Link href="/contact" className="nav-link font-medium">Contact</Link>
        </nav>

        <div className="hidden md:block">
          <Link href="/portal/login">
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
            Portal Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className="py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="py-2 px-4 hover:bg-muted rounded-md">
              <details>
                <summary className="cursor-pointer">About</summary>
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  <Link 
                    href="/about/history" 
                    className="py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our History
                  </Link>
                  <Link 
                    href="/about/mission" 
                    className="py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mission & Vision
                  </Link>
                  <Link 
                    href="/about/staff" 
                    className="py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Staff & Faculty
                  </Link>
                </div>
              </details>
            </div>
            <Link 
              href="/academics" 
              className="py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Academics
            </Link>
            <Link 
              href="/admissions" 
              className="py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admissions
            </Link>
            <Link 
              href="/news" 
              className="py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              News & Events
            </Link>
            <Link 
              href="/contact" 
              className="py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary/10">
                Portal Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
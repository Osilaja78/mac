"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  Book,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  User2,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fullNavigation = [
  { name: 'Dashboard', href: '/portal/admin/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/portal/admin/dashboard/students', icon: Users },
  { name: 'Report Cards', href: '/portal/admin/dashboard/report-cards', icon: GraduationCap },
  { name: 'Reading Materials', href: '/portal/admin/dashboard/materials', icon: Book },
  { name: 'News & Updates', href: '/portal/admin/dashboard/news', icon: FileText },
  { name: 'Admins', href: '/portal/admin/dashboard/admins', icon: User2 },
  { name: 'Settings', href: '/portal/admin/dashboard/settings', icon: Settings },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminRole, setAdminRole] = useState<'admin' | 'teacher' | 'principal' | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('adminRole') as 'admin' | 'teacher' | 'principal' | null;
    if (!storedRole) {
      router.push('/portal/admin/login');
    } else {
      setAdminRole(storedRole);
    }
  }, [router])

  const handleLogout = () => {
    try {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRole');
      router.push('/portal/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

   // Filter navigation based on role
   const navigation = fullNavigation.filter(item => {
    if (adminRole === 'teacher') {
      // Teachers can't see "Admins" or "Settings"
      return item.name !== 'Dashboard' && item.name !== 'Reading Materials' && item.name !== 'News & Updates' && item.name !== 'Admins' && item.name !== 'Settings'
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#f9f7f4]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Admin Portal</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b z-30">
          <div className="flex items-center justify-between h-full px-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}

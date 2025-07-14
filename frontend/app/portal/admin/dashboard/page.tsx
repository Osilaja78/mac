"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface DashboardInfo {
  total_students: number
  total_report_cards: number
  total_materials: number
  total_news: number
  recent_materials: Array<{
    id: string
    title: string
    subject: string
    class_assigned: string
    upload_date: string
    term: string
    session: string
    file_name: string
  }>
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/students-info`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard information');
        }

        const data = await response.json();
        setDashboardInfo(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dashboard information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardInfo();
  }, [toast]);

  const stats = [
    {
      title: "Total Students",
      value: dashboardInfo?.total_students ?? 0,
      icon: Users,
      description: "Active students"
    },
    {
      title: "Report Cards",
      value: dashboardInfo?.total_report_cards ?? 0,
      icon: GraduationCap,
      description: "Total generated"
    },
    {
      title: "Reading Materials",
      value: dashboardInfo?.total_materials ?? 0,
      icon: BookOpen,
      description: "Uploaded resources"
    },
    {
      title: "News & Updates",
      value: dashboardInfo?.total_news ?? 0,
      icon: FileText,
      description: "Published this month"
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your school&apos;s digital resources
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Report Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <p className="text-gray-600 mb-4">
                    Manage and generate student report cards
                  </p>
                  <Button 
                    onClick={() => router.push('/portal/admin/dashboard/report-cards')}
                    className="flex items-center gap-2"
                  >
                    Go to Report Cards
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Uploaded Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : dashboardInfo?.recent_materials.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                      No materials uploaded yet
                    </p>
                  ) : (
                    dashboardInfo?.recent_materials.map((material) => (
                      <div
                        key={material.id}
                        className="p-3 bg-gray-50 rounded-lg space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{material.title}</h3>
                          <span className="text-xs text-gray-500">
                            {material.class_assigned}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{material.subject}</span>
                          <span className="text-xs text-gray-500">
                            {formatDate(material.upload_date)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

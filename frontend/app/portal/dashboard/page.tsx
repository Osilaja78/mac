"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  User,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  GraduationCap,
  FileText,
  Bell,
  Clock,
  BarChart,
  LogOut
} from 'lucide-react';
import { useStudent } from '@/hooks/useStudent';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';


export default function PortalDashboardPage() {

  const { student, loading, error } = useStudent();
  const { toast } = useToast();
  const router = useRouter();

  // Show error toast if fetch fails
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error
      })
    }
  }, [error, toast]);

  const handleViewReport = (reportId: number) => {
    router.push('/portal/dashboard/academic-reports')
  }

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6 my-20 mx-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <Skeleton className="h-24 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-20 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  if (loading) {
    return <LoadingSkeleton />
  }

  const mostRecentReport = student?.report_cards?.[0];
  
  return (
    <main className="min-h-screen bg-[#f9f7f4] px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Student Info Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800">
              👋🏽 Welcome back, {student?.full_name}
            </h1>
            <p className="text-gray-600">
              Class: {student?.current_class} | Admission No: {student?.admission_number}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Term
                  </CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Third Term</div>
                  <p className="text-xs text-gray-500">2024/2025</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Add more stats cards */}
            {/* ...existing stats cards code... */}
          </div>

          {/* Recent Report Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Recent Academic Report</CardTitle>
              </CardHeader>
              <CardContent>
                {mostRecentReport ? (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{mostRecentReport.term} Term</h3>
                        <p className="text-sm text-gray-500">{mostRecentReport.session}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-sm font-medium">Position: {mostRecentReport.position_in_class}/{mostRecentReport.total_students}</p>
                        <p className="text-xs text-gray-500">Class: {mostRecentReport.class_name}</p>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleViewReport(mostRecentReport.id)}>
                        View Full Report
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No academic reports yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Profile Section - Right Side */}
        <div className="space-y-6">
          {/* Student Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="relative h-[500px] bg-gradient-to-r from-primary to-primary/80">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <Image
                    src={student?.profile_image || "/images/default-avatar.png"}
                    alt="Student"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Guardian Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Guardian Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{student?.guardian_name}</p>
                      <p className="text-sm text-gray-500">Guardian Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{student?.guardian_phone}</p>
                      <p className="text-sm text-gray-500">Phone Number</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{student?.guardian_email}</p>
                      <p className="text-sm text-gray-500">Email Address</p>
                    </div>
                  </div>
                </div>

                {/* <div className="pt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    Update Guardian Info
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

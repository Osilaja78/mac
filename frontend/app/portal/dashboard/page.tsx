"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BookOpen,
  Calendar,
  GraduationCap,
  FileText,
  Bell,
  Clock,
  BarChart,
  LogOut
} from 'lucide-react'

export default function PortalDashboardPage() {
  const courses = [
    { name: "Advanced Mathematics", grade: "A", progress: 85 },
    { name: "World Literature", grade: "A-", progress: 92 },
    { name: "Physics", grade: "B+", progress: 78 },
    { name: "World History", grade: "A", progress: 95 }
  ]
  
  const assignments = [
    {
      title: "Mathematics Problem Set",
      course: "Advanced Mathematics",
      dueDate: "March 25, 2025",
      status: "Pending"
    },
    {
      title: "Literature Essay",
      course: "World Literature",
      dueDate: "March 28, 2025",
      status: "In Progress"
    },
    {
      title: "Physics Lab Report",
      course: "Physics",
      dueDate: "March 30, 2025",
      status: "Not Started"
    }
  ]
  
  const announcements = [
    {
      title: "Spring Break Schedule",
      date: "March 20, 2025",
      content: "Spring break will be from April 1-8. Classes resume April 9."
    },
    {
      title: "Science Fair Registration",
      date: "March 18, 2025",
      content: "Register for the annual Science Fair by March 31."
    },
    {
      title: "Parent-Teacher Conferences",
      date: "March 15, 2025",
      content: "Schedule your conference slots for next week."
    }
  ]
  
  return (
    <main className="min-h-screen bg-[#f9f7f4]">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Student Portal</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Current GPA
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.85</div>
                <p className="text-xs text-gray-500">Spring 2025</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Assignments Due
                </CardTitle>
                <FileText className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-gray-500">This Week</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance Rate
                </CardTitle>
                <Clock className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-gray-500">This Semester</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{course.name}</h3>
                          <p className="text-sm text-gray-500">Grade: {course.grade}</p>
                        </div>
                        <div className="w-32">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 text-right mt-1">
                            {course.progress}% Complete
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-gray-500">{assignment.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{assignment.dueDate}</p>
                          <p className="text-xs text-gray-500">{assignment.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium mb-1">{announcement.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                      <p className="text-xs text-gray-500">{announcement.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
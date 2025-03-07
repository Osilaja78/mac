"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Calendar, DollarSign, GraduationCap } from 'lucide-react'

export function AdmissionsRequirements() {
  const requirements = [
    {
      title: "Required Documents",
      icon: <FileText className="h-8 w-8 text-primary" />,
      items: [
        "Completed application form",
        "Birth certificate or passport",
        "Previous academic records (2 years)",
        "Teacher recommendations (2)",
        "Health and immunization records",
        "Recent photograph"
      ]
    },
    {
      title: "Key Dates",
      icon: <Calendar className="h-8 w-8 text-secondary" />,
      items: [
        "Application Deadline: March 15, 2026",
        "Assessment Period: April 1-15, 2026",
        "Family Interviews: April 15-30, 2026",
        "Decision Notifications: May 1, 2026",
        "Enrollment Confirmation: May 15, 2026",
        "New Student Orientation: August 20, 2026"
      ]
    },
    {
      title: "Tuition & Fees",
      icon: <DollarSign className="h-8 w-8 text-accent" />,
      items: [
        "Application Fee: $100 (non-refundable)",
        "KG, Nursery: $18,500/year",
        "Primary School: $20,500/year",
        "Secondary School (9-12): $22,500/year",
        "Activity Fee: $750/year"
      ]
    },
    {
      title: "Grade Level Requirements",
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      items: [
        "Kindergarten: 5 years old by September 1",
        "Primary School: Age-appropriate readiness",
        "Middle School: Strong academic foundation",
        "High School: Successful completion of middle school",
        "Transfer Students: Good academic standing",
        "International Students: English proficiency"
      ]
    }
  ]
  
  return (
    <section className="py-16 bg-[#f9f7f4]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Admissions Requirements</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Review our admissions requirements and prepare all necessary documents to ensure a smooth application process.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center">
                      {req.icon}
                    </div>
                    <CardTitle className="text-xl">{req.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {req.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
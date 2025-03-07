"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Users, BookOpen, Heart, Wrench } from 'lucide-react'

export function StaffDirectory() {
  const departments = [
    {
      name: "Administration",
      icon: <Users className="h-6 w-6 text-primary" />,
      staff: [
        {
          name: "Amanda Johnson",
          role: "Administrative Assistant",
          contact: "admin@mothersaidschools.edu"
        },
        {
          name: "Robert Davis",
          role: "Office Manager",
          contact: "office@mothersaidschools.edu"
        }
      ]
    },
    {
      name: "Student Services",
      icon: <BookOpen className="h-6 w-6 text-secondary" />,
      staff: [
        {
          name: "Dr. Patricia Lee",
          role: "School Counselor",
          contact: "counseling@mothersadischools.edu"
        },
        {
          name: "Mark Wilson",
          role: "Career Advisor",
          contact: "careers@mothersaidschools.edu"
        }
      ]
    },
    {
      name: "Health Services",
      icon: <Heart className="h-6 w-6 text-accent" />,
      staff: [
        {
          name: "Nurse Sarah Smith",
          role: "School Nurse",
          contact: "health@motersaidschools.edu"
        },
        {
          name: "Dr. Michael Brown",
          role: "School Physician",
          contact: "medical@mothersaidschools.edu"
        }
      ]
    },
    {
      name: "Facilities",
      icon: <Wrench className="h-6 w-6 text-primary" />,
      staff: [
        {
          name: "Tom Martinez",
          role: "Facilities Manager",
          contact: "facilities@mothersaidschools.edu"
        },
        {
          name: "James Wright",
          role: "Maintenance Supervisor",
          contact: "maintenance@mothersaidschools.edu"
        }
      ]
    }
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Staff Directory</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our dedicated staff members work together to ensure the smooth operation of our school and support our educational mission.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                      {dept.icon}
                    </div>
                    <CardTitle className="text-xl">{dept.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dept.staff.map((person, i) => (
                      <div key={i} className="flex flex-col space-y-2">
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-gray-600">{person.role}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <a 
                            href={`mailto:${person.contact}`}
                            className="flex items-center text-primary hover:text-primary/80 transition-colors"
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            {person.contact}
                          </a>
                          <a 
                            href="tel:+1234567890"
                            className="flex items-center text-primary hover:text-primary/80 transition-colors"
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Contact
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
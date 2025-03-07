"use client"

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Users, School } from 'lucide-react'

export function ContactInfo() {
  const contactDetails = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Address",
      details: [
        "123 Education Lane",
        "Learning City, LC 12345",
        "United States"
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      details: [
        "Main Office: (123) 456-7890",
        "Admissions: (123) 456-7891",
        "Fax: (123) 456-7892"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: [
        "info@mothersaidschools.edu",
        "admissions@mothersaidschools.edu",
        "support@mothersaidschools.edu"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 4:00 PM",
        "Saturday: 9:00 AM - 12:00 PM",
        "Sunday: Closed"
      ]
    }
  ]
  
  const departments = [
    {
      icon: <School className="h-6 w-6 text-accent" />,
      title: "Admissions Office",
      contact: "admissions@mothersaidschools.edu"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Student Services",
      contact: "students@mothersaidschools.edu"
    }
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      
      <div className="space-y-8 mb-10">
        {contactDetails.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              {item.icon}
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <ul className="space-y-1 text-gray-600">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      
      <h3 className="text-2xl font-bold mb-6">Key Departments</h3>
      
      <div className="space-y-6">
        {departments.map((dept, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}
            className="flex"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
              {dept.icon}
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">{dept.title}</h4>
              <p className="text-gray-600">{dept.contact}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
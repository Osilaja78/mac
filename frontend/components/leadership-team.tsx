"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Linkedin } from 'lucide-react'

export function LeadershipTeam() {
  const leaders = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Principal",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      bio: "Dr. Mitchell brings over 20 years of educational leadership experience, focusing on innovative teaching methods and student-centered learning.",
      email: "principal@mothersaidschools.edu",
      linkedin: "#"
    },
    {
      name: "Prof. James Anderson",
      role: "Academic Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      bio: "With expertise in curriculum development and educational technology, Prof. Anderson leads our academic programs and faculty development initiatives.",
      email: "academic.director@mothersaidschools.edu",
      linkedin: "#"
    },
    {
      name: "Ms. Emily Chen",
      role: "Head of Student Affairs",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80",
      bio: "Ms. Chen oversees student support services, extracurricular programs, and ensures a positive school environment for all students.",
      email: "student.affairs@mothersaidschools.edu",
      linkedin: "#"
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
          <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Meet our experienced leadership team dedicated to providing excellence in education and fostering student success.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <p className="text-primary font-medium">{leader.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{leader.bio}</p>
                  <div className="flex space-x-4">
                    <a 
                      href={`mailto:${leader.email}`}
                      className="text-gray-600 hover:text-primary transition-colors"
                      aria-label={`Email ${leader.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a 
                      href={leader.linkedin}
                      className="text-gray-600 hover:text-primary transition-colors"
                      aria-label={`${leader.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
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
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Eye, Star } from 'lucide-react'

export function MissionVision() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20"></div>
                <div className="absolute top-4 left-4 bg-white p-3 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  Mother&apos;s Aid Schools, a caring and collaborative learning community, ensures that each stuent achieve intellectual and personal excellence and is well prepared for higher education and career pathway.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Foster academic excellence and critical thinking</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Nurture creativity and personal growth</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Build strong character and leadership skills</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80"
                  alt="Our Vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-accent/20"></div>
                <div className="absolute top-4 left-4 bg-white p-3 rounded-full">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
              </div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-6">
                  Grooming leaders that demonstrate knowledge, skills, and flourish as a responsible citizen in the global community.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Lead in educational innovation and excellence</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Create global citizens and future leaders</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Foster a diverse and inclusive community</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Music, Palette, Trophy, Globe, Code } from 'lucide-react'

export function AcademicsSection() {
  const curriculum = [
    { name: "Mathematics", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Science", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Language Arts", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Social Studies", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Physical Education", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Languages", icon: <Globe className="h-5 w-5" /> },
  ]
  
  const extracurricular = [
    { name: "Cultural & Drama Club", icon: <Music className="h-5 w-5" /> },
    { name: "Filmmaking/press club", icon: <Palette className="h-5 w-5" /> },
    { name: "Sports Teams", icon: <Trophy className="h-5 w-5" /> },
    { name: "Farmers Club", icon: <Code className="h-5 w-5" /> },
    { name: "Literary & Debate Team", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Spelling Club", icon: <BookOpen className="h-5 w-5" /> },
  ]
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic Excellence</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our comprehensive curriculum and diverse extracurricular activities provide students with a well-rounded education that prepares them for future success.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-[20px] md:px-[70px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#f9f7f4] p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Core Curriculum</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {curriculum.map((subject, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {subject.icon}
                  </div>
                  <span className="font-medium">{subject.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#f9f7f4] p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Extracurricular Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {extracurricular.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    {activity.icon}
                  </div>
                  <span className="font-medium">{activity.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full group">
            View Academics
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
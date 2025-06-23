"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Clock, Star, Target } from 'lucide-react'

export function CoreValues() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Empathy",
      description: "We foster kindness, compassion, and understanding, encouraging students to connect with and care for others."
    },
    {
      icon: <Star className="h-8 w-8 text-secondary" />,
      title: "Confidence",
      description: "We empower students to believe in themselves, take initiative, and face challenges with courage and resilience."
    },
    // {
    //   icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    //   title: "Integrity",
    //   description: "We uphold honesty, fairness, and strong moral principles, encouraging students to do what’s right even when it’s difficult."
    // },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Self-Discipline",
      description: "We encourage responsibility, focus, and perseverance in achieving personal and academic goals."
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Reliability",
      description: "We promote consistency, accountability, and dependability in both our actions and commitments."
    }
    // {
    //   icon: <BookOpen className="h-8 w-8 text-accent" />,
    //   title: "Lifelong Learning",
    //   description: "We inspire curiosity and a passion for continuous learning, growth, and discovery."
    // }
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
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            These fundamental principles guide our decisions, shape our culture, and define who we are as an educational institution.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
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
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
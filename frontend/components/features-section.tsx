"use client"

import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Lightbulb, Palette, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Comprehensive Curriculum",
    description: "Our curriculum is designed to challenge students while fostering a love for learning."
  },
  {
    icon: <Users className="h-10 w-10 text-secondary" />,
    title: "Small Class Sizes",
    description: "We maintain small class sizes to ensure personalized attention for every student."
  },
  {
    icon: <Award className="h-10 w-10 text-accent" />,
    title: "Qualified Teachers",
    description: "Our teachers are highly qualified professionals dedicated to educational excellence."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Innovative Learning",
    description: "We incorporate modern teaching methods and technology to enhance the learning experience."
  },
  {
    icon: <Palette className="h-10 w-10 text-secondary" />,
    title: "Arts & Creativity",
    description: "We nurture creativity through comprehensive arts programs and creative activities."
  },
  {
    icon: <Globe className="h-10 w-10 text-accent" />,
    title: "Global Perspective",
    description: "Students develop a global mindset through international connections and diverse perspectives."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose Mother&apos;s Aid?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We provide a nurturing environment where students can thrive academically, socially, and emotionally.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover border-none bg-white shadow-md">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
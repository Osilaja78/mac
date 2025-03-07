"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Award, Lightbulb } from 'lucide-react'

export function CurriculumOverview() {
  const highlights = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Comprehensive Curriculum",
      description: "Our curriculum is designed to challenge students while fostering a love for learning."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Small Class Sizes",
      description: "We maintain small class sizes to ensure personalized attention for every student."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Qualified Faculty",
      description: "Our teachers are highly qualified professionals dedicated to educational excellence."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Innovative Approach",
      description: "We incorporate modern teaching methods and technology to enhance learning."
    }
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Curriculum Overview</h2>
            <div className="w-20 h-1 bg-secondary mb-8"></div>
            <p className="text-lg text-gray-700 mb-8">
              At Mother&apos;s Aid, we offer a balanced and comprehensive curriculum that combines academic rigor with 
              creative exploration. Our program is designed to develop the whole child, nurturing intellectual curiosity, 
              critical thinking skills, and personal growth.
            </p>
            
            <p className="text-lg text-gray-700 mb-8">
              Our curriculum meets and exceeds national standards while providing flexibility to address individual 
              learning styles and interests. We emphasize depth of understanding rather than mere memorization, 
              encouraging students to make connections across disciplines and apply their knowledge to real-world situations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full group">
              Download Curriculum Guide
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80"
                alt="Students in classroom"
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-lg rotate-12 z-[-1]"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-accent rounded-full z-[-1]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
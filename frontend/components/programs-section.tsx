"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const programs = [
  {
    title: "Primary School",
    description: "Our primary school program focuses on building strong foundations in literacy, numeracy, and critical thinking while nurturing curiosity and creativity.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
    link: "/academics/primary"
  },
  {
    title: "Secondary School",
    description: "Our secondary program prepares students for higher education and future careers through rigorous academics, leadership opportunities, and personalized guidance.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    link: "/academics/secondary"
  }
]

export function ProgramsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Academic Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover our comprehensive educational programs designed to inspire and challenge students at every level.
          </motion.p>
        </div>

        <div className="space-y-16">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2 relative overflow-hidden rounded-2xl">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={800}
                    height={450}
                    className="object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{program.title}</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {program.description}
                </p>
                <Button variant="outline" className="group">
                  Learn More 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
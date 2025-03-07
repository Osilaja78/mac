"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Our Story
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 mb-8">
              Founded in 1995, Mother&apos;s Aid has been committed to providing exceptional education that nurtures the intellectual, social, and emotional development of each student. Our approach combines rigorous academics with creative exploration, preparing students to become thoughtful, engaged citizens of the world.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We believe that every child has unique talents and abilities, and our dedicated faculty works to create an environment where students feel supported, challenged, and inspired to reach their full potential.
            </p>
            
            <Button variant="outline" className="group border-primary text-primary hover:bg-primary/10">
              Read More About Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#f9f7f4] p-8 rounded-xl text-center"
          >
            <h3 className="text-5xl font-bold text-primary mb-2">28</h3>
            <p className="text-gray-600">Years of Excellence</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#f9f7f4] p-8 rounded-xl text-center"
          >
            <h3 className="text-5xl font-bold text-secondary mb-2">45+</h3>
            <p className="text-gray-600">Expert Faculty Members</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#f9f7f4] p-8 rounded-xl text-center"
          >
            <h3 className="text-5xl font-bold text-primary mb-2">850</h3>
            <p className="text-gray-600">Students Enrolled</p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-4 border-primary/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-secondary/20 rounded-lg rotate-12"></div>
    </section>
  )
}
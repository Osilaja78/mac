"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

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
              Mother&apos;s Aid schools is a co-educational school (pre-school, primary and seconday) which was established in 2009. The school which was founded by Mrs. Osilaja Onigemo F. B.Sc(Ed) Secretarial Education, the school commenced full operation on 23rd October, 2009 with the aim of grooming leaders that flourish as responsible citizens in the global community.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Thanks to our commitment to excellence, we have been able to remain true to our motto, "Achieving Intellectual and Personal Excellence". The school obtained Government Approval in 2007 and since then, we've had the privilege to seat for the West African Examination Council (WAEC), National Examination Council (NECO) and Basic Education Certificate Examination (BECE) exams with great performance from all our students.
            </p>
            
            <Button variant="outline" className="group border-primary text-primary hover:bg-primary/10">
              Read More About Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Accreditations */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-center mb-8"
          >
            Our Accreditations
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center px-[30px] md:px-[100px]"
          >
            <div className="bg-[#f9f7f4] p-8 rounded-xl w-full max-w-[300px] aspect-video flex flex-col items-center justify-center group hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/lagos-state-nobg.png"
                alt="Lagos State Government"
                width={120}
                height={60}
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <p className="text-gray-600 mt-4 text-center text-sm">Lagos State Government</p>
            </div>
            
            <div className="bg-[#f9f7f4] p-8 rounded-xl w-full max-w-[300px] aspect-video flex flex-col items-center justify-center group hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/waec-nobg.png"
                alt="West African Examination Council"
                width={120}
                height={60}
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <p className="text-gray-600 mt-4 text-center text-sm">West African Examination Council</p>
            </div>
            
            <div className="bg-[#f9f7f4] p-8 rounded-xl w-full max-w-[300px] aspect-video flex flex-col items-center justify-center group hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/neco-nobg.png"
                alt="National Examination Council"
                width={120}
                height={60}
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <p className="text-gray-600 mt-4 text-center text-sm">National Examination Council</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-4 border-primary/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-secondary/20 rounded-lg rotate-12"></div>
    </section>
  )
}
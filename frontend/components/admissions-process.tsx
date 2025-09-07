"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function AdmissionsProcess() {
  const steps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Complete and submit the online application form along with the application fee.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />
    },
    {
      number: "02",
      title: "Provide Documents",
      description: "Submit academic records, recommendation letters, and other required documents.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />
    },
    {
      number: "03",
      title: "Entrance Assessment",
      description: "Students take age-appropriate assessments to determine academic readiness.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />
    },
    {
      number: "04",
      title: "Family Interview",
      description: "Meet with our admissions team to discuss your child's educational goals.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />
    },
    {
      number: "05",
      title: "Admission Decision",
      description: "Receive notification of the admission decision within 2-3 weeks.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />
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
            <h2 className="text-3xl font-bold mb-6">Admissions Process</h2>
            <div className="w-20 h-1 bg-secondary mb-8"></div>
            <p className="text-lg text-gray-700 mb-8">
              Our admissions process is designed to ensure a good fit between our school and prospective students. 
              We look for students who will thrive in our challenging academic environment and contribute positively 
              to our school community.
            </p>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-primary">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10">
              <Link href="https://forms.gle/ZxaMmcEPJYBVaGhu5" target='_blank'>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full group">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
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
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Students in classroom"
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-accent/20 mix-blend-multiply"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-lg rotate-12 z-[-1]"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary rounded-full z-[-1]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
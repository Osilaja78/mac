"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function AdmissionsSection() {
  const steps = [
    "Submit application form",
    "Provide academic records",
    "Schedule entrance assessment",
    // "Attend family interview",
    "Receive admission decision"
  ]
  
  return (
    <section className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <div className="w-20 h-1 bg-secondary mb-6"></div>
              <p className="text-gray-700 mb-8">
                We welcome applications from families who share our commitment to academic excellence and personal growth. Our admissions process is designed to ensure a good fit between our school and prospective students.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Admissions Process</h3>
              <ul className="space-y-3 mb-8">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              
              <Link href='https://forms.gle/ZxaMmcEPJYBVaGhu5' target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full">
                  Apply Now
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-accent p-8 md:p-12 text-white"
              style={{
                backgroundImage: `linear-gradient(rgba(90, 79, 207, 0.9), rgba(90, 79, 207, 0.9)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold mb-6">Key Dates</h3>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">Application Deadline</h4>
                  <p className="text-white/90">March 15, 2026</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">Assessment Period</h4>
                  <p className="text-white/90">April 1-15, 2026</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">Decision Notifications</h4>
                  <p className="text-white/90">May 1, 2026</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">Enrollment Confirmation</h4>
                  <p className="text-white/90">May 15, 2026</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
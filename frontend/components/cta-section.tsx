"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Phone } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div 
              className="bg-primary p-8 md:p-12 text-white"
              style={{
                backgroundImage: `linear-gradient(rgba(227, 66, 52, 0.9), rgba(227, 66, 52, 0.9)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
                <p className="text-white/90 mb-8">
                  Take the first step towards providing your child with an exceptional educational experience. Apply now or schedule a visit to learn more about our programs.
                </p>
                <div className="space-y-4">
                  <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90">
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-6">
                  Have questions? We're here to help. Schedule a visit or contact our admissions team.
                </p>
                
                <div className="space-y-4">
                  <Button size="lg" variant="outline" className="w-full flex items-center justify-center border-primary text-primary hover:bg-primary/10">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule a Visit
                  </Button>
                  
                  <Button size="lg" variant="outline" className="w-full flex items-center justify-center border-primary text-primary hover:bg-primary/10">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Admissions
                  </Button>
                </div>
                
                <div className="mt-8 pt-8 border-t">
                  <h4 className="font-semibold mb-2">Admissions Office</h4>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Phone: (123) 456-7890</p>
                  <p className="text-gray-600">Email: admissions@mothersaidschools.edu</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
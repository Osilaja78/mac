"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

export function TeachingMethodology() {
  const methodologies = [
    {
      title: "Student-Centered Learning",
      description: "We place students at the center of the educational experience, encouraging active participation and ownership of learning."
    },
    {
      title: "Inquiry-Based Approach",
      description: "Students develop critical thinking skills by asking questions, investigating topics, and discovering answers through exploration."
    },
    {
      title: "Differentiated Instruction",
      description: "We adapt teaching methods to address diverse learning styles, abilities, and interests of individual students."
    },
    {
      title: "Project-Based Learning",
      description: "Students engage in complex, real-world projects that develop deeper understanding and practical skills."
    },
    {
      title: "Technology Integration",
      description: "We thoughtfully incorporate digital tools to enhance learning, research, collaboration, and creativity."
    },
    {
      title: "Assessment for Learning",
      description: "We use ongoing assessment to provide meaningful feedback and guide instruction for continuous improvement."
    }
  ]
  
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl font-bold mb-6">Our Teaching Methodology</h2>
            <div className="w-20 h-1 bg-secondary mb-8"></div>
            <p className="text-lg text-gray-700 mb-8">
              At Mother&apos;s Aid, we believe that effective teaching requires a blend of proven educational 
              approaches and innovative strategies. Our methodology is designed to engage students, foster deep 
              understanding, and develop essential skills for success in the 21st century.
            </p>
            
            <div className="space-y-4">
              {methodologies.map((method, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
                alt="Teacher with students"
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary rounded-lg rotate-12 z-[-1]"></div>
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary rounded-full z-[-1]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
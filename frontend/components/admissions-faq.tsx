"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function AdmissionsFAQ() {
  const faqs = [
    {
      question: "What is the student-to-teacher ratio at Mother\'s Aid?",
      answer: "We maintain a low student-to-teacher ratio of 15:1 in primary school and 18:1 in secondary school. This allows our teachers to provide personalized attention to each student and create a more engaging learning environment."
    },
    {
      question: "Do you offer financial aid or scholarships?",
      answer: "Yes, Mother&apos;s Aid offers need-based financial aid and merit scholarships to qualified students. Financial aid applications are reviewed separately from admission applications. Merit scholarships are awarded based on academic excellence, leadership potential, and special talents."
    },
    {
      question: "Is there a waiting list for admission?",
      answer: "Popular grade levels may have waiting lists, especially for mid-year applications. We encourage families to apply early. If a grade level is full, qualified applicants may be placed on a waiting list and contacted when a space becomes available."
    },
    {
      question: "What support services are available for students with learning differences?",
      answer: "Our Learning Support Center provides services for students with mild to moderate learning differences. We offer individualized learning plans, small group instruction, and classroom accommodations. During the admissions process, please share any educational assessments to help us determine if we can meet your child's needs."
    },
    {
      question: "Do you accept international students?",
      answer: "Yes, we welcome international students who meet our academic requirements. International applicants must demonstrate English proficiency and may need to complete additional assessments. We can provide guidance on student visa requirements for international students."
    },
    {
      question: "What is the school's approach to technology in the classroom?",
      answer: "We integrate technology thoughtfully into our curriculum. Primary students have access to shared devices, while middle and high school students participate in our 1:1 laptop program. All classrooms are equipped with interactive technology, and we emphasize digital citizenship and responsible technology use."
    }
  ]
  
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about our admissions process and school programs.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div 
                className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'shadow-md' : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 p-4 pt-0' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-700 pt-2">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-700">
            Have more questions? <a href="/contact" className="text-primary font-medium hover:underline">Contact our admissions team</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
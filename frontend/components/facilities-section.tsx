"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Lab from '@/public/images/laboratory.jpg'
import Sports from '@/public/images/games.jpeg'
import ArtStudio from '@/public/images/art-studio.jpg'
import Classroom from '@/public/images/classroom.jpg'
import Hall from '@/public/images/hall.jpg'

const facilities = [
  {
    title: "Modern Classrooms",
    description: "Spacious, well-lit classrooms equipped with the latest educational technology.",
    image: Classroom
  },
  {
    title: "Science Laboratories",
    description: "State-of-the-art labs for physics, chemistry, and biology experiments.",
    image: Lab
  },
  {
    title: "Library & Media Center",
    description: "Extensive collection of books, digital resources, and quiet study spaces.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Sports Facilities",
    description: "Indoor and outdoor facilities for various sports and physical activities.",
    image: Sports
  },
  {
    title: "Arts Studio",
    description: "Creative spaces for visual arts, drama, and other artistic pursuits.",
    image: ArtStudio
  },
  {
    title: "Examination Halls",
    description: "A space designed for conducting examinations with proper seating and facilities.",
    image: Hall
  }
]

export function FacilitiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= facilities.length ? 0 : prevIndex + 3
    )
  }
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? Math.max(0, facilities.length - 3) : prevIndex - 3
    )
  }
  
  const visibleFacilities = facilities.slice(currentIndex, currentIndex + 3)
  
  return (
    <section className="py-20 bg-[#f9f7f4] relative overflow-hidden px-[30px] md:px-[100px]">
      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-64 h-64 bg-primary/5 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/5 rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Facilities</h2>
            <div className="w-20 h-1 bg-secondary mb-4"></div>
            <p className="text-lg text-gray-700 max-w-2xl">
              Explore our modern structure designed to provide students with the best learning environment and resources.
            </p>
          </motion.div>
          
          <div className="flex space-x-2 mt-6 md:mt-0">
            <button 
              onClick={prevSlide}
              className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Previous facilities"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Next facilities"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleFacilities.map((facility, index) => (
            <motion.div
              key={currentIndex + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(facilities.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-3 h-3 rounded-full transition-all ${
                Math.floor(currentIndex / 3) === index ? 'bg-primary scale-125' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Building1 from '@/public/images/building1.jpg';
import Lab3 from '@/public/images/lab3_c.jpg';
import Lab5 from '@/public/images/lab5.jpg';
import Student from '@/public/images/students_hero.jpg';

const images = [
  Building1,
  Student,
  Lab3,
  Lab5
]

const stats = [
  { value: "17+", label: "Years of Excellence" },
  // { value: "850+", label: "Students Enrolled" },
  { value: "95%", label: "WAEC Success Rate" },
  { value: "90%", label: "NECO Success Rate" },
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f9f7f4] px-[30px] md:px-[100px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl -top-48 -right-48 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl -bottom-32 -left-32 animate-pulse delay-1000"></div>
        <div className="absolute w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl top-1/2 left-1/4 animate-pulse delay-2000"></div>
      </div>

      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0 min-h-screen"
        >
          <Image
            src={images[currentImage]}
            alt="background"
            style={{objectFit: "cover", objectPosition: "center", width: "100%", height: "100%"}}
            className="absolute inset-0"
            priority
          />
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6">
                Welcome to Mother&apos;s Aid Schools
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Where academic{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">excellence</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-3 bg-secondary/30 -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                ></motion.span>
              </span>{" "}
              <br />
              begins.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl text-gray-700 mb-10 max-w-lg"
            >
              Achieving intellectual and personal excellence.
              {/* Providing exceptional education for primary and secondary students in a nurturing environment that fosters creativity, critical thinking, and personal growth. */}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 group relative overflow-hidden"
              >
                <span className="relative z-10">Apply Now</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full px-8 group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-500">
              <div className="aspect-w-4 aspect-h-3 md:aspect-w-16 md:aspect-h-9">
                <div className="w-full h-full"></div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-lg rotate-12 z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="absolute -top-6 -right-2 w-20 h-20 bg-accent rounded-full z-[-1]"
            />
          </motion.div> */}
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center space-x-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage ? 'bg-primary scale-125' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
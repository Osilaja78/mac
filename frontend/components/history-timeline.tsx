"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export function HistoryTimeline() {
  const milestones = [
    {
      year: "1995",
      title: "Foundation",
      description: "Mother&apos;s Aid was founded with a vision to provide innovative education that nurtures the whole child.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
    },
    {
      year: "2000",
      title: "Campus Expansion",
      description: "Expanded our campus to include new science laboratories and a state-of-the-art library.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
    },
    {
      year: "2005",
      title: "STEM Program Launch",
      description: "Introduced comprehensive STEM programs and established partnerships with leading technology companies.",
      image: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2010",
      title: "Arts Center Opening",
      description: "Opened our performing arts center, enhancing our commitment to arts education.",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2015",
      title: "International Program",
      description: "Launched our international exchange program, connecting students with schools worldwide.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80"
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Implemented comprehensive digital learning platforms and innovative teaching methodologies.",
      image: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Continuing our commitment to excellence with planned expansions and innovative programs.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    }
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              <div className="w-full md:w-1/2">
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </Card>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-primary"></div>
                  <CardContent className="pl-8">
                    <span className="text-4xl font-bold text-primary mb-4 block">
                      {milestone.year}
                    </span>
                    <h3 className="text-2xl font-bold mb-4">{milestone.title}</h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </CardContent>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
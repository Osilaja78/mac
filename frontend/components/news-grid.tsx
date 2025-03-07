"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ArrowRight, Tag } from 'lucide-react'

const newsItems = [
  {
    title: "Annual Science Fair Winners Announced",
    date: "May 15, 2025",
    category: "Academic Achievement",
    excerpt: "Congratulations to all participants in this year's Science Fair. The creativity and innovation displayed were truly impressive. Our panel of judges had a difficult time selecting winners from such outstanding projects.",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/news/science-fair-winners"
  },
  {
    title: "New Arts Center Opening Next Month",
    date: "April 28, 2025",
    category: "Campus Facilities",
    excerpt: "We're excited to announce the opening of our new state-of-the-art Arts Center, which will enhance our visual and performing arts programs. The center features specialized studios, a gallery space, and a 200-seat theater.",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/news/arts-center-opening"
  },
  {
    title: "Basketball Team Advances to Finals",
    date: "April 10, 2025",
    category: "Sports",
    excerpt: "Our secondary school basketball team has advanced to the regional finals after an impressive victory in the semifinals. The team showed exceptional teamwork and determination throughout the tournament.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80",
    link: "/news/basketball-finals"
  },
  {
    title: "International Exchange Program Expands",
    date: "March 22, 2025",
    category: "Global Education",
    excerpt: "Mother&apos;s Aid is proud to announce the expansion of our international exchange program to include partner schools in three new countries. This program provides students with valuable cultural experiences and global perspectives.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
    link: "/news/exchange-program-expansion"
  },
  {
    title: "Robotics Club Wins National Competition",
    date: "March 5, 2025",
    category: "STEM",
    excerpt: "Our Robotics Club has won first place in the National Robotics Challenge. The team's innovative design and programming skills impressed the judges and set a new standard for the competition.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/news/robotics-competition-win"
  },
  {
    title: "Environmental Sustainability Initiative Launched",
    date: "February 18, 2025",
    category: "Campus Life",
    excerpt: "Mother&apos;s Aid has launched a comprehensive sustainability initiative aimed at reducing our environmental footprint. The program includes solar panel installation, waste reduction strategies, and student-led conservation projects.",
    image: "https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    link: "/news/sustainability-initiative"
  }
]

export function NewsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full overflow-hidden card-hover border-none shadow-md">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <div className="flex items-center text-accent">
                  <Tag className="h-4 w-4 mr-1" />
                  <span className="text-xs">{item.category}</span>
                </div>
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                {item.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={item.link} className="text-primary font-medium hover:underline inline-flex items-center group">
                Read More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
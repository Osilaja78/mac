"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

const events = [
  {
    title: "Open House for Prospective Families",
    date: "June 10, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Main Campus, Auditorium",
    description: "Join us for an informative session about our academic programs, tour our facilities, and meet our faculty and staff.",
    category: "Admissions"
  },
  {
    title: "Annual Spring Concert",
    date: "May 25, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Performing Arts Center",
    description: "Our music department presents a delightful evening of performances featuring our choir, orchestra, and band.",
    category: "Arts"
  },
  {
    title: "Parent-Teacher Conference",
    date: "May 18-19, 2025",
    time: "3:30 PM - 7:30 PM",
    location: "All Classrooms",
    description: "Schedule meetings with your child's teachers to discuss academic progress and address any concerns.",
    category: "Academic"
  },
  {
    title: "Science & Technology Fair",
    date: "May 5, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Science Building",
    description: "Students showcase their innovative science projects and technological solutions to real-world problems.",
    category: "STEM"
  },
  {
    title: "Sports Day",
    date: "April 22, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Sports Fields & Gymnasium",
    description: "A day of athletic competitions, team sports, and physical activities for students of all ages.",
    category: "Sports"
  }
]

export function EventsList() {
  return (
    <div className="space-y-10 mb-10">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-32 p-4 bg-primary/10 rounded-xl">
              <span className="text-primary text-3xl font-bold">
                {event.date.split(',')[0].split(' ')[1]}
              </span>
              <span className="text-gray-600">
                {event.date.split(',')[0].split(' ')[0]}
              </span>
              <span className="text-gray-600 mt-1">
                {event.date.split(',')[1] || '2025'}
              </span>
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  {event.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              
              <p className="text-gray-600 mb-4">
                {event.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {event.location}
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 flex items-center justify-center">
              {/* <Button className="bg-primary hover:bg-primary/90 text-white rounded-full">
                Register
              </Button> */}
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* <div className="text-center mt-10">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          View All Events
        </Button>
      </div> */}
    </div>
  )
}
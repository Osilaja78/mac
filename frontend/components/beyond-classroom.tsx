"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trophy, Users, Globe, Camera, Book, Leaf, Mic, PenTool } from 'lucide-react'

export function BeyondClassroom() {
  const sections = {
    sports: {
      title: "Sports and Indoor Games",
      description: "We offer a wide range of sporting activities that help develop teamwork, discipline, and physical fitness. Our extra-curricular activities include:",
      items: [
        "Football",
        "Taekwando",
        "Table Tennis",
        "Chess and Board Games",
        "Volleyball",
        "Athletic Track"
      ],
      icon: <Trophy className="h-6 w-6 text-white" />,
      color: "bg-primary",
      image: "/images/taekwando.jpeg"
    },
    clubs: {
      title: "Clubs and Societies",
      description: "Our diverse clubs and societies help students develop leadership skills and explore their interests:",
      activities: [
        {
          name: "Cultural/Drama Club",
          description: "Exploring Nigerian culture through drama and performances",
          icon: <Mic className="h-6 w-6 text-white" />,
          image: "/images/clubs/drama-club.jpg"
        },
        {
          name: "Filmmaking/Press Club",
          description: "Creating digital content and school publications",
          icon: <Camera className="h-6 w-6 text-white" />,
          image: "/images/clubs/press.jpg"
        },
        {
          name: "Farmers Club",
          description: "Learning sustainable agriculture practices",
          icon: <Leaf className="h-6 w-6 text-white" />,
          image: "/images/clubs/farming.jpg"
        },
        {
          name: "Literary & Debating Society",
          description: "Developing public speaking and critical thinking skills",
          icon: <Book className="h-6 w-6 text-white" />,
          image: "/images/clubs/debate.jpg"
        },
        {
          name: "Spelling Club",
          description: "Enhancing vocabulary and language skills",
          icon: <PenTool className="h-6 w-6 text-white" />,
          image: "/images/clubs/spelling.jpg"
        }
      ],
      color: "bg-secondary"
    },
    trips: {
      title: "Educational Trips",
      description: "We organize educational excursions to broaden students' horizons:",
      activities: [
        {
          name: "National Museum",
          description: "Exploring Nigerian history and culture",
          image: "/images/trips/art-trip.jpg",
          date: "Term 1"
        },
        {
          name: "Terra Kulture",
          description: "Arts and cultural center visits",
          image: "/images/trips/terra-kulture.jpg",
          date: "Term 1"
        },
        {
          name: "Lekki Conservation Centre",
          description: "Environmental studies and nature exploration",
          image: "/images/trips/lekki-conservation.jpg",
          date: "Term 2"
        },
        {
          name: "Science Museum",
          description: "Interactive science learning experience",
          image: "/images/trips/science-museum.jpg",
          date: "Term 2"
        }
      ],
      color: "bg-accent"
    }
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Sports Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={sections.sports.image}
                  alt={sections.sports.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className={`absolute top-4 left-4 ${sections.sports.color} p-3 rounded-full`}>
                  {sections.sports.icon}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className={`h-1 w-16 ${sections.sports.color} mb-6`}></div>
              <h2 className="text-3xl font-bold mb-4">{sections.sports.title}</h2>
              <p className="text-gray-700 mb-6">{sections.sports.description}</p>
              
              <div className="space-y-3">
                {sections.sports.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-2 h-2 rounded-full ${sections.sports.color}`}></div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Clubs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">{sections.clubs.title}</h2>
          <div className={`h-1 w-16 ${sections.clubs.color} mb-12 mx-auto`}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.clubs.activities.map((club, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="relative h-[300px]">
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className={`${sections.clubs.color} p-2 rounded-full w-fit mb-4`}>
                      {club.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                    <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {club.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Educational Trips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">{sections.trips.title}</h2>
          <div className={`h-1 w-16 ${sections.trips.color} mb-12 mx-auto`}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.trips.activities.map((trip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-[400px]">
                  <Image
                    src={trip.image}
                    alt={trip.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm w-fit mb-4">
                      {trip.date}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{trip.name}</h3>
                    <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {trip.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
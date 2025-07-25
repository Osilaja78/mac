"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export function AcademicAchievements() {
  const studentAchievements = [
    {
      image: "/images/results/20250623_152633.jpg",
      name: "Adeyi Marvellous",
      year: "2023",
      grade: "8A1s, 1B2"
    },
    {
      image: "/images/results/20250623_152744.jpg",
      name: "Akilo Yemisi",
      year: "2023",
      grade: "7A1s, 2B2s"
    },
    {
      image: "/images/results/20250623_155249.jpg",
      name: "Alimi Titilayo",
      year: "2024",
      grade: "9A1s"
    },
    {
      image: "/images/results/20250623_155349.jpg",
      name: "Shokunbi Kehinde",
      year: "2024",
      grade: "8A1s, 1B2"
    },
    {
      image: "/images/results/20250623_150551.jpg",
      name: "Ashamu Mariam",
      year: "2023",
      grade: "8A1s, 1B2"
    },
    {
      image: "/images/results/20250623_150735.jpg",
      name: "Ayelabowo Oyindamola",
      year: "2023",
      grade: "7A1s, 2B2s"
    },
    {
      image: "/images/results/20250623_150853.jpg",
      name: "Ogunbolu Folashade",
      year: "2023",
      grade: "9A1s"
    },
    {
      image: "/images/results/20250623_151022.jpg",
      name: "Nnamani David",
      year: "2023",
      grade: "8A1s, 1B2"
    }
  ]
  
  return (
    <section className="py-16 bg-[#f9f7f4]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Outstanding WAEC/NECO Results</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Celebrating our students' exceptional performance in WAEC/NECO examinations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-[30px] md:px-[100px]">
          {studentAchievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative w-full h-[300px]">
                    <Image
                      src={achievement.image}
                      alt={`${achievement.name}'s WAEC Result`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    {/* <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {achievement.grade}
                    </div> */}
                  </div>
                </CardHeader>
                <CardContent className="text-center p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{achievement.name}</h3>
                  <p className="text-gray-600">Class of {achievement.year}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
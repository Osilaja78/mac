"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, TrendingUp, BarChart, GraduationCap } from 'lucide-react'

export function AcademicAchievements() {
  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      value: "97%",
      label: "College Acceptance Rate",
      description: "Our graduates are accepted to their top-choice colleges and universities."
    },
    {
      icon: <Award className="h-8 w-8 text-secondary" />,
      value: "45+",
      label: "Academic Competitions Won",
      description: "Students excel in regional and national academic competitions annually."
    },
    {
      icon: <BarChart className="h-8 w-8 text-accent" />,
      value: "Top 5%",
      label: "Standardized Test Scores",
      description: "Our students consistently score in the top percentiles on standardized tests."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      value: "$3.2M",
      label: "Scholarship Offers",
      description: "Last year's graduating class received impressive scholarship offers."
    }
  ]
  
  const achievements = [
    "National Merit Scholarship Finalists",
    "Presidential Scholars Program Recognition",
    "Science Olympiad State Champions",
    "Debate Team National Qualifiers",
    "Math Competition Regional Winners",
    "Model UN Outstanding Delegation Awards",
    "Scholastic Art & Writing Awards",
    "National History Day Competition Finalists"
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
          <h2 className="text-3xl font-bold mb-4">Academic Excellence & Achievements</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our students consistently demonstrate exceptional academic performance and achievement in various fields.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-[30px] md:px-[100px]">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-md text-center">
                <CardHeader className="pb-2">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <CardTitle className="text-4xl font-bold text-primary">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                  <p className="text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Recent Student Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-accent/5 p-4 rounded-lg flex items-center"
              >
                <Award className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <span className="text-gray-800">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
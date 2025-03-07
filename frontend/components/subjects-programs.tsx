"use client"

import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calculator, FlaskRound as Flask, Globe, Music, Palette, Code, Users } from 'lucide-react'

export function SubjectsPrograms() {
  const primarySubjects = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Language Arts",
      description: "Developing strong reading, writing, speaking, and listening skills through literature, grammar, and creative expression."
    },
    {
      icon: <Calculator className="h-6 w-6 text-primary" />,
      title: "Mathematics",
      description: "Building number sense, problem-solving abilities, and mathematical reasoning through hands-on activities and conceptual understanding."
    },
    {
      icon: <Flask className="h-6 w-6 text-primary" />,
      title: "Science",
      description: "Exploring the natural world through inquiry-based learning, experiments, and environmental studies."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Social Studies",
      description: "Learning about history, geography, cultures, and civic responsibility through engaging projects and discussions."
    },
    {
      icon: <Music className="h-6 w-6 text-primary" />,
      title: "Arts & Music",
      description: "Developing creativity and self-expression through visual arts, music, drama, and movement."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Physical Education",
      description: "Promoting physical fitness, teamwork, and healthy habits through sports and movement activities."
    }
  ]
  
  const secondarySubjects = [
    {
      icon: <BookOpen className="h-6 w-6 text-accent" />,
      title: "English & Literature",
      description: "Analyzing classic and contemporary literature, developing critical writing skills, and mastering effective communication."
    },
    {
      icon: <Calculator className="h-6 w-6 text-accent" />,
      title: "Advanced Mathematics",
      description: "Progressing through algebra, geometry, trigonometry, pre-calculus, and calculus with real-world applications."
    },
    {
      icon: <Flask className="h-6 w-6 text-accent" />,
      title: "Sciences",
      description: "Exploring biology, chemistry, physics, and environmental science through laboratory work and research projects."
    },
    {
      icon: <Globe className="h-6 w-6 text-accent" />,
      title: "History & Social Sciences",
      description: "Examining world and national history, government, economics, and contemporary global issues."
    },
    {
      icon: <Code className="h-6 w-6 text-accent" />,
      title: "Technology & Computer Science",
      description: "Developing digital literacy, programming skills, and understanding of emerging technologies."
    },
    {
      icon: <Palette className="h-6 w-6 text-accent" />,
      title: "Arts & Electives",
      description: "Pursuing interests in visual arts, performing arts, journalism, psychology, and other specialized subjects."
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
          <h2 className="text-3xl font-bold mb-4">Subjects & Programs</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our comprehensive academic programs are tailored to meet the needs of students at different developmental stages.
          </p>
        </motion.div>
        
        <Tabs defaultValue="primary" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="primary" className="text-lg py-3">Primary School</TabsTrigger>
            <TabsTrigger value="secondary" className="text-lg py-3">Secondary School</TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {primarySubjects.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-none shadow-md">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {subject.icon}
                        </div>
                        <CardTitle className="text-xl">{subject.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 text-base">
                        {subject.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="secondary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondarySubjects.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-none shadow-md">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          {subject.icon}
                        </div>
                        <CardTitle className="text-xl">{subject.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 text-base">
                        {subject.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
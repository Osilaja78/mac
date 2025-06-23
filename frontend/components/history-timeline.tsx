"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import Lab from '@/public/images/lab3_c.jpg'

export function HistoryTimeline() {
  const milestones = [
    {
      year: "About Us",
      // title: "About Us",
      description: `Mother\'s Aid schools is a co-educational (pre-school, primary and secondary) which was established in 2009. The school was founded by Mrs. Osilaja Onigemo F. B.Sc.(Ed) Secreterial Education, the school commenced full operation in 23rd October 2009 with the aim of grooming leaders that flourish as responsible citizens in the global community. Thanks to our commitment to excellence, we have been able to remain true to our motto, 'Achieving Intellectual and Personal Excellence'. {'\n'} The school obained Government Approval in 2017 and since then we've had the privilege to seat for the West African Examination Council (WAEC), National Examination Council (NECO) and Basic Education Certificate Examination (BECE) exams with great performance from all our students.`,
      image: Lab
    },
    {
      year: "Reason Why We Are Different From Others",
      title: "Campus Expansion",
      description: <p>
        
        {'   '}• Appetizers:  
        {'   '}• Main Courses: {'\n'}
        {'   '}• Desserts: {'\n'}
        {'   '}• Beverages: 
      </p>,
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
          {/* {milestones.map((milestone, index) => ( */}
            <motion.div
              // key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 mb-16`}
            >
              <div className="w-full md:w-1/2">
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={Lab}
                      alt={'Milestone Image'}
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
                    {/* About us */}
                    <span className="text-4xl font-bold text-primary mb-4 block">
                      About Us
                    </span>
                    {/* <h3 className="text-2xl font-bold mb-4">{milestone.title}</h3> */}
                    <p className="text-gray-700">Mother&apos;s Aid schools is a co-educational (pre-school, primary and secondary) which was established in 2009. The school was founded by Mrs. Osilaja Onigemo F. B.Sc.(Ed) Secreterial Education, the school commenced full operation in 23rd October 2009 with the aim of grooming leaders that flourish as responsible citizens in the global community. Thanks to our commitment to excellence, we have been able to remain true to our motto, 'Achieving Intellectual and Personal Excellence'.</p>
                    <br />
                    <p className="text-gray-700">The school obained Government Approval in 2017 and since then we've had the privilege to seat for the West African Examination Council (WAEC), National Examination Council (NECO) and Basic Education Certificate Examination (BECE) exams with great performance from all our students.</p>
                    {/* Reason why we're different */}
                    <span className=" text-lg font-bold text-primary mb-4 mt-10 block">
                      REASON WHY WE ARE DIFFERENT FROM OTHERS
                    </span>
                    <p className="text-gray-700">Every student that is enrolled in Mother&apos;s Aid Schools  becomes part of our large family. At the heart of every home is a family and Mother&apos;'s Aid Schools is no different.</p>
                    <ul className='list-disc mt-4 ml-6 text-gray-700'>
                      <li><b className='font-bold'>COMMITMENT TO EXCELLENCE: </b>We have a track record of delivering excellent results and we don&apos;t compromise</li>
                      <li><b className='font-bold'>ACADEMIC EXCELLENCE: </b>Our commitment to academic excellence is unwavering. Our students are high fliers.</li>
                      <li><b className='font-bold'>SELF-DISCIPLINE: </b>We key into insitlling self-discipline into our students which bolster performance in task and academic success.</li>
                      <li><b className='font-bold'>GROOMING LEADERS: </b>For us, every child is a protential leader. That&apos;s why we nurture and groom them to become leaders.</li>
                      <li><b className='font-bold'>BRINGING OUT POTENTIAL: </b> We understand that every child has a unique gift and out goal is to let that gift shine.</li>
                      <li><b className='font-bold'>BEST AMONG THE BEST: </b>We are simply the best at what we do with a persistent record of excellence over many years.</li>
                    </ul>
                    <p className="text-gray-700">Our proven record of excellence for education in Lagos state and Nigeria at large is what has driven so many families to join our esteemed educational institution.</p>
                  </CardContent>
                </div>
              </div>
            </motion.div>
          {/* ))} */}
        </div>
      </div>
    </section>
  )
}
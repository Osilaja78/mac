import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CurriculumOverview } from '@/components/curriculum-overview'
import { SubjectsPrograms } from '@/components/subjects-programs'
import { TeachingMethodology } from '@/components/teaching-methodology'
import { AcademicAchievements } from '@/components/academic-achievements'
import { BeyondClassroom } from '@/components/beyond-classroom'
import { CTASection } from '@/components/cta-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academics | Mother&apos;s Aid',
  description: 'Explore our comprehensive curriculum, teaching methodology, and academic programs at Mother&apos;s Aid.',
}

export default function AcademicsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Academics</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Our rigorous academic program is designed to challenge, inspire, and prepare students 
            for success in college and beyond. We foster critical thinking, creativity, and a lifelong love of learning.
          </p>
        </div>
      </div>
      
      <CurriculumOverview />
      <SubjectsPrograms />
      <TeachingMethodology />
      <AcademicAchievements />
      <BeyondClassroom />
      <CTASection />
      
      <Footer />
    </main>
  )
}
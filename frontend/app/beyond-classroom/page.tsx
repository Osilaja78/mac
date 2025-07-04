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
  title: 'Academics | Mother\'s Aid',
  description: 'Explore our comprehensive curriculum, teaching methodology, and academic programs at Mother&apos;s Aid.',
}

export default function AcademicsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Beyond Academics</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            At Mother's Aid Schools, we have a variety of extra-curricular activities designed to help our 
            students to broaden their creativity, critical thinking and interests. We believe that every one of 
            our students should have passions that continue beyond their time with us. Our job is to help our 
            students cultivate what captivates them by providing a varied range of exciting co-curricular activities.
          </p>
        </div>
      </div>
      
      <BeyondClassroom />
      <CTASection />
      
      <Footer />
    </main>
  )
}
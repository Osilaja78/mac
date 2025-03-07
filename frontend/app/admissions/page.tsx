import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdmissionsProcess } from '@/components/admissions-process'
import { AdmissionsRequirements } from '@/components/admissions-requirements'
import { AdmissionsFAQ } from '@/components/admissions-faq'
import { CTASection } from '@/components/cta-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admissions | Mother&apos;s Aid',
  description: 'Learn about the admissions process, requirements, and how to apply to Mother&apos;s Aid.',
}

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Admissions</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Join our vibrant learning community. Discover the admissions process, requirements, 
            and everything you need to know about becoming a Mother&apos;s Aid student.
          </p>
        </div>
      </div>
      
      <AdmissionsProcess />
      <AdmissionsRequirements />
      <AdmissionsFAQ />
      <CTASection />
      
      <Footer />
    </main>
  )
}
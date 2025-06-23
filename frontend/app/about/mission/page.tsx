import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MissionVision } from '@/components/mission-vision'
import { CoreValues } from '@/components/core-values'
import { CTASection } from '@/components/cta-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission & Vision | Mother\'s Aid',
  description: 'Discover our mission, vision, and core values that guide everything we do at Mother\'s Aid.',
}

export default function MissionPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Mission & Vision</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Our mission and vision guide us in creating an exceptional learning environment 
            where students can thrive and reach their full potential.
          </p>
        </div>
      </div>
      
      <MissionVision />
      <CoreValues />
      <CTASection />
      <Footer />
    </main>
  )
}
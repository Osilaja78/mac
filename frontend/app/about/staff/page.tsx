import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LeadershipTeam } from '@/components/leadership-team'
import { FacultyGrid } from '@/components/faculty-grid'
import { StaffDirectory } from '@/components/staff-directory'
import { CTASection } from '@/components/cta-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Staff & Faculty | Mother&apos;s Aid',
  description: 'Meet our dedicated team of educators and staff members who make Mother&apos;s Aid a center of excellence.',
}

export default function StaffPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Staff & Faculty</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Our exceptional educators and staff members are dedicated to providing the highest 
            quality education and supporting our students' growth and development.
          </p>
        </div>
      </div>
      
      <LeadershipTeam />
      <FacultyGrid />
      <StaffDirectory />
      <CTASection />
      <Footer />
    </main>
  )
}
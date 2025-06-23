import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HistoryTimeline } from '@/components/history-timeline'
import { CTASection } from '@/components/cta-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our History | Mother\'s Aid',
  description: 'Learn about the rich history and evolution of Mother\'s Aid since our founding in 2009.',
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our History</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Since our founding in 2009, Mother&apos;s Aid has been committed to providing 
            exceptional education that nurtures the intellectual, social, and emotional 
            development of each student.
          </p>
        </div>
      </div>
      
      <HistoryTimeline />
      <CTASection />
      <Footer />
    </main>
  )
}
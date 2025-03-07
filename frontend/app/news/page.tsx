import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { NewsGrid } from '@/components/news-grid'
import { EventsList } from '@/components/events-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Events | Mother&apos;s Aid',
  description: 'Stay updated with the latest news and upcoming events at Mother&apos;s Aid.',
}

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">News & Events</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Stay updated with the latest happenings at Mother&apos;s Aid. 
            Discover our recent achievements, upcoming events, and community activities.
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest News</h2>
          <NewsGrid />
        </div>
      </div>
      
      <div className="py-16 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <EventsList />
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
"use client"

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewsGrid } from '@/components/news-grid';
import { EventsList } from '@/components/events-list';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'News & Events | Mother\'s Aid',
//   description: 'Stay updated with the latest news and upcoming events at Mother\'s Aid.',
// }

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface NewsItem {
  id: string
  title: string
  content: string
  date_uploaded: string
  image_url: string
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/news`)
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      const data = await response.json()
      setNewsItems(data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((news) => (
                <div 
                  key={news.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${API_URL}${news.image_url}`}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{news.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(news.date_uploaded)}
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {news.content}
                    </p>
                    <button
                      onClick={() => setSelectedNews(news)}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold pb-4">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${API_URL}${selectedNews.image_url}`}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(selectedNews.date_uploaded)}
                </p>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {selectedNews.content}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
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
"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewsItem {
  id: string
  title: string
  content: string
  date_uploaded: string
  image_url: string
}

export function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/news')
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      const data = await response.json()
      setNewsItems(data)
    } catch (error) {
      setError('Failed to load news')
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

  const handleViewAllClick = () => {
    router.push('/news');
  }

  return (
    <section className="py-20 bg-white px-[30px] md:px-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest News & Events</h2>
            <div className="w-20 h-1 bg-secondary mb-4"></div>
            <p className="text-lg text-gray-700">Stay updated with what's happening at Mother&apos;s Aid</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Button variant="outline" onClick={handleViewAllClick} className="group border-primary text-primary hover:bg-primary/10">
              View All News
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
            <div className="col-span-3 flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="col-span-3 text-center py-20 text-gray-500">{error}</div>
          ) : newsItems.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-gray-500">No news available</div>
          ) : (
            newsItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden card-hover border-none shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`http://localhost:8000${item.image_url}`}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(item.date_uploaded)}</span>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 text-base line-clamp-3">
                      {item.content}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="text-primary font-medium hover:underline inline-flex items-center group"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" onClick={handleViewAllClick} className="border-primary text-primary hover:bg-primary/10">
            View All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
                    <Image
                      src={`http://localhost:8000${selectedNews.image_url}`}
                      alt={selectedNews.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(selectedNews.date_uploaded)}
                  </p>
                  <div className="prose max-w-none pb-4">
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {selectedNews.content}
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
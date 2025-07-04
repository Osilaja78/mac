"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date_uploaded: string;
  image_url: string;
}

export default function NewsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/news`)

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setNewsItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load news items",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedImage) {
        throw new Error('Please select a cover image');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('cover_image', selectedImage);

      const response = await fetch(`${API_URL}/admin/news`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create news');
      }

      toast({
        title: "Success",
        description: "News created successfully",
      });

      // Reset form and refresh news list
      setFormData({ title: '', content: '' });
      setSelectedImage(null);
      setPreviewUrl(null);
      setIsDialogOpen(false);
      fetchNews();

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create news",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDelete = async (newsId: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return
  
    try {
      const response = await fetch(`${API_URL}/admin/news/${newsId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
  
      if (!response.ok) {
        throw new Error('Failed to delete news')
      }
  
      toast({
        title: "Success",
        description: "News deleted successfully",
      })
      
      fetchNews()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete news",
        variant: "destructive"
      })
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingNews) return
    setIsSubmitting(true)
  
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('content', formData.content)
      if (selectedImage) {
        formDataToSend.append('cover_image', selectedImage)
      }
  
      const response = await fetch(`${API_URL}/admin/news/${editingNews.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formDataToSend
      })
  
      if (!response.ok) {
        throw new Error('Failed to update news')
      }
  
      toast({
        title: "Success",
        description: "News updated successfully",
      })
  
      setEditingNews(null)
      setIsDialogOpen(false)
      setFormData({ title: '', content: '' })
      setSelectedImage(null)
      setPreviewUrl(null)
      fetchNews()
  
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update news",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">News & Updates</h1>
            <p className="text-gray-600">Manage school news and announcements</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add News
            </Button>
          </motion.div>
        </div>

        {/* News Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="h-48 bg-gray-100 animate-pulse rounded-lg mb-4" />
                  <div className="h-6 bg-gray-100 animate-pulse rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : newsItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No news items found</p>
            </div>
          ) : (
            newsItems.map((news) => (
              <Card key={news.id} className="border-none shadow-lg overflow-hidden">
                <div className="aspect-video relative">
									<div className="absolute top-2 right-2 z-10">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
													<MoreVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem onClick={() => {
													setEditingNews(news)
													setFormData({ title: news.title, content: news.content })
													setIsDialogOpen(true)
												}}>
													<Pencil className="h-4 w-4 mr-2" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleDelete(news.id)}>
													<Trash2 className="h-4 w-4 mr-2" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${API_URL}${news.image_url}`}
                    alt={news.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {formatDate(news.date_uploaded)}
                  </p>
                  <p className="text-gray-600 line-clamp-3">{news.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </motion.div>

        {/* Add/Edit News Dialog */}
        <Dialog 
					open={isDialogOpen}
					onOpenChange={(open) => {
						setIsDialogOpen(open)
						if (!open) {
							setEditingNews(null)
							setFormData({ title: '', content: '' })
							setSelectedImage(null)
							setPreviewUrl(null)
						}
					}}
				>
          <DialogContent className="sm:max-w-[600px]">
						<DialogHeader>
							<DialogTitle>{editingNews ? 'Edit News' : 'Add News'}</DialogTitle>
							<DialogDescription>
								{editingNews ? 'Update existing news item' : 'Create a new news item or announcement'}
							</DialogDescription>
						</DialogHeader>

						<form onSubmit={editingNews ? handleUpdate : handleSubmit} className="space-y-6">
							<div className="space-y-2">
								<Input
									placeholder="News Title"
									value={formData.title}
									onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
									required
								/>
							</div>

							<div className="space-y-2">
								<Textarea
									placeholder="News Content"
									value={formData.content}
									onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
									required
									className="min-h-[150px]"
								/>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-center w-full">
									<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
										{previewUrl ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src={previewUrl}
												alt="Preview"
												className="w-full h-full object-contain"
											/>
										) : editingNews ? (
											<div className="relative w-full h-full">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={`${API_URL}${editingNews.image_url}`}
													alt={editingNews.title}
													className="w-full h-full object-contain"
												/>
												<p className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-500 bg-black/50 py-2">
													Click to change image
												</p>
											</div>
										) : (
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
												<p className="mb-2 text-sm text-gray-500">
													<span className="font-semibold">Click to upload</span> or drag and drop
												</p>
												<p className="text-xs text-gray-500">PNG, JPG or GIF</p>
											</div>
										)}
										<input
											type="file"
											className="hidden"
											accept="image/*"
											onChange={handleImageChange}
											required={!editingNews} // Only required for new news items
										/>
									</label>
								</div>
							</div>

							<div className="flex justify-end gap-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => {
										setIsDialogOpen(false)
										setEditingNews(null)
										setFormData({ title: '', content: '' })
										setSelectedImage(null)
										setPreviewUrl(null)
									}}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											<Loader2 className="h-4 w-4 mr-2 animate-spin" />
											{editingNews ? 'Updating...' : 'Publishing...'}
										</>
									) : (
										editingNews ? 'Update News' : 'Publish News'
									)}
								</Button>
							</div>
						</form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

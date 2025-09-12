"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Upload, File, X, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Material {
  id: string;
  title: string;
  description: string;
  subject: string;
  class_assigned: string;
  term: string;
  session: string;
  file_name: string;
  upload_date: string;
}

export default function MaterialsUploadPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class_assigned: '',
    term: '',
    session: ''
  });
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!selectedFile) {
        throw new Error('Please select a file to upload')
      }

      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        throw new Error('File size too large. Maximum size is 10MB')
      }

      const formDataToSend = new FormData()
      
      // Append all form data first
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      
      // Append file last to ensure proper multipart/form-data structure
      formDataToSend.append('file', selectedFile)

      const response = await fetch(`${API_URL}/admin/reading-materials`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        // Remove Content-Type header - let browser set it with boundary
        body: formDataToSend
      })

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to upload material');
      }

      toast({
        title: "Success",
        description: "Material uploaded successfully",
      });

      // Reset form and file state
      setFormData({
        title: '',
        description: '',
        subject: '',
        class_assigned: '',
        term: '',
        session: ''
      });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload material",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/reading-materials`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch materials');
      }

      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch materials",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (materialId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/admin/reading-materials/${materialId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete material');
      }

      toast({
        title: "Success",
        description: "Material deleted successfully",
      });
      
      // Refresh materials list
      fetchMaterials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete material",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-800">Upload Learning Material</h1>
        <p className="text-gray-600">Add new reading materials for students</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      subject: e.target.value
                    }))}
                    placeholder="Enter subject name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select
                    value={formData.class_assigned}
                    onValueChange={value => setFormData(prev => ({
                      ...prev,
                      class_assigned: value
                    }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JSS1">JSS1</SelectItem>
                      <SelectItem value="JSS2">JSS2</SelectItem>
                      <SelectItem value="JSS3">JSS3</SelectItem>
                      <SelectItem value="SSS1">SSS1</SelectItem>
                      <SelectItem value="SSS2">SSS2</SelectItem>
                      <SelectItem value="SSS3">SSS3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Term</Label>
                  <Select
                    value={formData.term}
                    onValueChange={value => setFormData(prev => ({
                      ...prev,
                      term: value
                    }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First">First Term</SelectItem>
                      <SelectItem value="Second">Second Term</SelectItem>
                      <SelectItem value="Third">Third Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Session</Label>
                  <Select
                    value={formData.session}
                    onValueChange={value => setFormData(prev => ({
                      ...prev,
                      session: value
                    }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2028/2029">2028/2029</SelectItem>
                      <SelectItem value="2027/2028">2027/2028</SelectItem>
                      <SelectItem value="2026/2027">2026/2027</SelectItem>
                      <SelectItem value="2025/2026">2025/2026</SelectItem>
                      <SelectItem value="2024/2025">2024/2025</SelectItem>
                      <SelectItem value="2023/2024">2023/2024</SelectItem>
                      <SelectItem value="2022/2023">2022/2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedFile ? (
                        <div className="flex items-center space-x-2">
                          <File className="h-6 w-6 text-primary" />
                          <span className="text-sm text-gray-500">
                            {selectedFile.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedFile(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOCX, or PPT (MAX. 10MB)</p>
                        </>
                      )}
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload Material"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Materials Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Available Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <Card key={material.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {material.subject} • {material.class_assigned}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          material.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-700"
                          onClick={() => handleDelete(material.id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span>{material.term} Term</span>
                  <span>•</span>
                  <span>{material.session}</span>
                  <span>•</span>
                  <span>Uploaded on {new Date(material.upload_date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

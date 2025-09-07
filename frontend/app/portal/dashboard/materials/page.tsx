"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ReadingMaterial {
  title: string;
  description: string;
  subject: string;
  file_url: string;
  upload_date: string;
  term: string;
  session: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<ReadingMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/students/reading-materials`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch materials");
        const data = await response.json();
        setMaterials(data.reading_materials || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load reading materials.",
          variant: "destructive",
        });
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

	const handleDownload = async (fileUrl: string) => {
		try {
			const response = await fetch(`${API_URL}${fileUrl}`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('studentToken')}`
				}
			});
			
			if (!response.ok) {
				throw new Error('Failed to download file');
			}
			
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'download';
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Download failed:', error);
		}
	};

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-800">Reading Materials</h1>
        <p className="text-gray-600">Access your class reading materials below</p>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full h-32 animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : materials.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="flex flex-col items-center space-y-4">
            <FileText className="h-12 w-12 text-gray-400" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">No Materials Found</h3>
              <p className="text-gray-500">No reading materials have been uploaded yet.</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-3">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {material.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {material.subject} • {material.term} Term • {material.session}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700 mb-2">{material.description}</p>
                  <p className="text-xs text-gray-400">
                    Uploaded: {new Date(material.upload_date).toLocaleDateString()}
                  </p>
									<Button
                    asChild
                    variant="outline"
                    size="sm"
										onClick={() => handleDownload(material.file_url)}
                  >
                    <a href={material.file_url} target="_blank" rel="noopener noreferrer" download>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

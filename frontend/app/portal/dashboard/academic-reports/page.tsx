"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { isDayOfWeekType } from 'react-day-picker';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SubjectScore {
  subject_name: string
  ca_score: number
  exam_score: number
  total_score: number
  grade: string
  teacher_remark: string
}

interface ReportCard {
  id: string
  term: string
  session: string
  class_name: string
  position_in_class: number
  total_students: number
  attendance: number
  subjects: SubjectScore[]
  date_generated: string
}

export default function ReportCardsPage() {
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<string>('all');
  const { toast } = useToast();

  const fetchReportCards = async () => {
    try {
      let url = `${API_URL}/students/academic-records`;
      const params = new URLSearchParams();
      
      if (selectedTerm && selectedTerm !== 'all') {
        params.append('term', selectedTerm);
      }
      if (selectedSession && selectedSession !== 'all') {
        params.append('session', selectedSession);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('studentToken')}`
        }
      })

	  if (response.status === 404) {
        setReportCards([]);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch report cards')
      }

      const data = await response.json();
			console.log("Fetched Report Cards: ", data);
      setReportCards(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch report cards",
        variant: "destructive"
      });
	  setReportCards([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReportCards();
  }, [selectedTerm, selectedSession]);

  const handleDownload = async (reportId: string) => {
    setIsDownloading(true);
    try {
      const response = await fetch(`${API_URL}/admin/report-cards/${reportId}/download`);
  
      if (!response.ok) {
        setIsDownloading(false);
        throw new Error('Failed to download report');
      }
  
      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report_card_${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
      toast({
        title: "Error",
        description: "Failed to download report card",
        variant: "destructive"
      });
    }
  };

  const groupedReportCards = reportCards.reduce((acc, card) => {
    const key = card.session
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(card)
    return acc
  }, {} as Record<string, ReportCard[]>)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full h-32 animate-pulse bg-gray-100" />
          ))}
        </div>
      </div>
    )
  }

  const hasReports = reportCards.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-gray-800">Academic Reports</h1>
          <p className="text-gray-600">View and download your report cards</p>
        </motion.div>

				{hasReports && (
					<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					className="flex gap-4 mt-4 md:mt-0"
					>
						<Select value={selectedTerm} onValueChange={(value) => setSelectedTerm(value)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filter by term" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Terms</SelectItem>
								<SelectItem value="First">First Term</SelectItem>
								<SelectItem value="Second">Second Term</SelectItem>
								<SelectItem value="Third">Third Term</SelectItem>
							</SelectContent>
						</Select>

						<Select value={selectedSession} onValueChange={(value) => setSelectedSession(value)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filter by session" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Sessions</SelectItem>
								<SelectItem value="2024/2025">2024/2025</SelectItem>
								<SelectItem value="2023/2024">2023/2024</SelectItem>
								<SelectItem value="2022/2023">2022/2023</SelectItem>
							</SelectContent>
						</Select>
					</motion.div>
				)}
      </div>

			{!hasReports ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="flex flex-col items-center space-y-4">
            <FileText className="h-12 w-12 text-gray-400" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">No Academic Reports</h3>
              <p className="text-gray-500">No report cards have been added yet.</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
					{Object.entries(groupedReportCards).map(([session, cards]) => (
						<motion.div
							key={session}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<Collapsible>
								<CollapsibleTrigger asChild>
									<Button
										variant="ghost"
										className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
									>
										<div className="flex items-center gap-2">
											<FileText className="h-5 w-5 text-primary" />
											<span className="font-semibold">{session} Academic Session</span>
										</div>
										<ChevronDown className="h-5 w-5" />
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="mt-4 space-y-4">
									{cards.map((card) => (
										<Card key={card.id} className="border-none shadow-lg">
											<CardHeader className="flex flex-row items-center justify-between">
												<div>
													<CardTitle>{card.term} Term Report</CardTitle>
													<p className="text-sm text-gray-500">
														Class: {card.class_name} • Position: {card.position_in_class}/{card.total_students}
													</p>
												</div>
												<Button variant="outline" size="sm" onClick={() => handleDownload(card.id)} disabled={isDownloading}>
													<Download className="h-4 w-4 mr-2" />
													Download
												</Button>
											</CardHeader>
											<CardContent>
												<div className="space-y-4">
													<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
														{card.subjects.map((subject, index) => (
															<div
																key={index}
																className="p-3 bg-gray-50 rounded-lg"
															>
																<h3 className="font-medium">{subject.subject_name}</h3>
																<div className="mt-2 space-y-1 text-sm">
																	<p>CA Score: {subject.ca_score}</p>
																	<p>Exam Score: {subject.exam_score}</p>
																	<p>Total: {subject.total_score}</p>
																	<p className="font-medium text-primary">Grade: {subject.grade}</p>
																</div>
															</div>
														))}
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</CollapsibleContent>
							</Collapsible>
						</motion.div>
					))}
				</div>
      )}
    </div>
  )
}

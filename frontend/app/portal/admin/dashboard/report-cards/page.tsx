"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download, Loader2 } from 'lucide-react';
import { ReportCardForm } from '@/components/report-card-form';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Subject {
  subject_name: string;
  ca_score: number;
  exam_score: number;
  total_score: number;
  grade: string;
  teacher_remark: string;
}

interface ReportCard {
  id: string;
  student_id: string;
  term: string;
  session: string;
  class_name: string;
  position_in_class: number;
  total_students: number;
  attendance: number;
  date_generated: string;
  subjects: Subject[];
  teacher_name: string;
  principal_name: string;
  teacher_remark: string;
  principal_remark: string;
  first_term_average: number | null;
}

export default function ReportCardsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);
  const [filteredReportCards, setFilteredReportCards] = useState<ReportCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    class: '',
    term: '',
    session: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchReportCards = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/report-cards`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch report cards');
        }

        const data = await response.json();
        setReportCards(data);
        setFilteredReportCards(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load report cards",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchReportCards();
  }, [toast]);

  useEffect(() => {
    let filtered = [...reportCards];

    if (filters.class) {
      filtered = filtered.filter(card => card.class_name === filters.class);
    }
    if (filters.term) {
      filtered = filtered.filter(card => card.term === filters.term);
    }
    if (filters.session) {
      filtered = filtered.filter(card => card.session === filters.session);
    }

    setFilteredReportCards(filtered)
  }, [filters, reportCards])

  const uniqueClasses = Array.from(new Set(reportCards.map(card => card.class_name)));
  const uniqueTerms = Array.from(new Set(reportCards.map(card => card.term)));
  const uniqueSessions = Array.from(new Set(reportCards.map(card => card.session)));

  const handleDownload = async (reportId: string) => {
    try {
      const response = await fetch(`${API_URL}/admin/report-cards/${reportId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
  
      if (!response.ok) {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report card",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">
              Report Cards
            </h1>
            <p className="text-gray-600">
              Generate and manage student report cards
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Report Card
            </Button>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Select
            value={filters.class}
            onValueChange={(value) => setFilters(prev => ({ ...prev, class: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {uniqueClasses.map(className => (
                <SelectItem key={className} value={className}>{className}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.term}
            onValueChange={(value) => setFilters(prev => ({ ...prev, term: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              {uniqueTerms.map(term => (
                <SelectItem key={term} value={term}>{term}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.session}
            onValueChange={(value) => setFilters(prev => ({ ...prev, session: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              {uniqueSessions.map(session => (
                <SelectItem key={session} value={session}>{session}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Report Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
                </CardContent>
              </Card>
            ))
          ) : filteredReportCards.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No report cards found</p>
            </div>
          ) : (
            filteredReportCards.map((card) => (
              <Card key={card.id} className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {card.student_id} • {card.class_name} • {card.term} Term
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Session:</span>
                      <span>{card.session}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Position:</span>
                      <span>{card.position_in_class}/{card.total_students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subjects:</span>
                      <span>{card.subjects.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Teacher:</span>
                      <span>{card.teacher_name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Principal:</span>
                      <span>{card.principal_name}</span>
                    </div>
                    {card.first_term_average && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">First Term Avg:</span>
                        <span>{card.first_term_average}%</span>
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleDownload(card.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Downloading...
                        </span>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </motion.div>

        {isFormOpen && (
          <ReportCardForm onClose={() => setIsFormOpen(false)} />
        )}
      </div>
    </div>
  )
}

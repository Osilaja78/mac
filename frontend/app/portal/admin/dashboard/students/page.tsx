"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Search, Filter } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Student {
  full_name: string;
  admission_number: string;
  current_class: string;
  gender: string;
  date_of_birth: string;
  guardian_name: string;
  guardian_phone: string;
  guardian_email: string;
  is_active: boolean;
  date_admitted: string;
  state_of_origin: string;
  local_government: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    class: '',
    isActive: ''
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, [])

  useEffect(() => {
    filterStudents();
  }, [searchTerm, filters, students]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/students`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load students",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const filterStudents = () => {
    let filtered = [...students];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admission_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Class filter
    if (filters.class && filters.class !== 'all') {
      filtered = filtered.filter(student => student.current_class === filters.class);
    }

    // Active status filter
    if (filters.isActive && filters.isActive !== 'all') {
      filtered = filtered.filter(student => 
        student.is_active === (filters.isActive === 'true')
      );
    }

    setFilteredStudents(filtered);
  }

  const handleUpdateStudent = async (studentData: Student) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/admin/students/${studentData.admission_number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(studentData)
      })

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      toast({
        title: "Success",
        description: "Student updated successfully",
      });

      // Refresh student list
      fetchStudents();
      setIsDialogOpen(false);
      setEditingStudent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update student",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const uniqueClasses = Array.from(new Set(students.map(student => student.current_class)));

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">Students</h1>
            <p className="text-gray-600">Manage and view all students</p>
          </motion.div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select
              value={filters.class}
              onValueChange={(value) => setFilters(prev => ({ ...prev, class: value }))}
            >
              <SelectTrigger className="w-[180px]">
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
              value={filters.isActive}
              onValueChange={(value) => setFilters(prev => ({ ...prev, isActive: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No students found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.admission_number} className="p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{student.full_name}</h3>
                    <p className="text-sm text-gray-500">{student.admission_number}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-sm ${
                    student.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {student.is_active ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm"><span className="font-medium">Class:</span> {student.current_class}</p>
                  <p className="text-sm"><span className="font-medium">Guardian:</span> {student.guardian_name}</p>
                  <p className="text-sm"><span className="font-medium">Phone:</span> {student.guardian_phone}</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> {student.guardian_email}</p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEditingStudent(student)
                    setIsDialogOpen(true)
                  }}
                >
                  Update Details
                </Button>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Update Student Details</DialogTitle>
              <DialogDescription>
                Make changes to the student&apos;s information below
              </DialogDescription>
            </DialogHeader>

            {editingStudent && (
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdateStudent(editingStudent)
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={editingStudent.full_name}
                    onChange={e => setEditingStudent({
                      ...editingStudent,
                      full_name: e.target.value
                    })}
                  />
                  <Input
                    placeholder="Class"
                    value={editingStudent.current_class}
                    onChange={e => setEditingStudent({
                      ...editingStudent,
                      current_class: e.target.value
                    })}
                  />
                  <Input
                    placeholder="Guardian Name"
                    value={editingStudent.guardian_name}
                    onChange={e => setEditingStudent({
                      ...editingStudent,
                      guardian_name: e.target.value
                    })}
                  />
                  <Input
                    placeholder="Guardian Phone"
                    value={editingStudent.guardian_phone}
                    onChange={e => setEditingStudent({
                      ...editingStudent,
                      guardian_phone: e.target.value
                    })}
                  />
                  <Input
                    placeholder="Guardian Email"
                    type="email"
                    value={editingStudent.guardian_email}
                    onChange={e => setEditingStudent({
                      ...editingStudent,
                      guardian_email: e.target.value
                    })}
                  />
                  <Select
                    value={editingStudent.is_active.toString()}
                    onValueChange={(value) => setEditingStudent({
                      ...editingStudent,
                      is_active: value === 'true'
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      setEditingStudent(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Student'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

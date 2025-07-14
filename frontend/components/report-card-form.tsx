"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
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
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface SubjectScore {
  subject_name: string
  ca_score: number
  exam_score: number
  grade: string
  teacher_remark: string
}

interface TeacherComment {
  comment_type: string
  comment: string
}

interface ReportCardFormProps {
  onClose: () => void
}

export function ReportCardForm({ onClose }: ReportCardFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [subjects, setSubjects] = useState<SubjectScore[]>([])
  const [currentSubject, setCurrentSubject] = useState<SubjectScore>({
    subject_name: '',
    ca_score: 0,
    exam_score: 0,
    grade: '',
    teacher_remark: ''
  })
  const [formData, setFormData] = useState({
    admission_number: '',
    term: '',
    session: '',
    class_name: '',
    position_in_class: 0,
    total_students: 0,
    attendance: 0,
    teacher_name: '',
    principal_name: '',
    teacher_remark: '',
    principal_remark: '',
    comments: [
      {
        comment_type: 'General',
        comment: ''
      }
    ]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (subjects.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one subject",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/admin/report-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ ...formData, subjects })
      })

      const data = await response.json()

      if (!response.ok) {
        console.log(data)
        throw new Error(data.detail || 'Failed to create report card')
      }

      toast({
        title: "Success",
        description: "Report card created successfully",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create report card",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addSubject = () => {
    if (!currentSubject.subject_name || currentSubject.ca_score === 0 || currentSubject.exam_score === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required subject fields",
        variant: "destructive"
      })
      return
    }

    setSubjects(prev => [...prev, currentSubject])
    setCurrentSubject({
      subject_name: '',
      ca_score: 0,
      exam_score: 0,
      grade: '',
      teacher_remark: ''
    })

    toast({
      title: "Subject Added",
      description: `${currentSubject.subject_name} has been added to the report card`,
    })
  }

  const removeSubject = (index: number) => {
    setSubjects(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 flex items-center justify-center">
        <Card className="w-full max-w-4xl bg-white p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold">Create Report Card</h2>

            {/* Student Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Admission Number</Label>
                <Input
                  required
                  value={formData.admission_number}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    admission_number: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Class</Label>
                <Select
                  value={formData.class_name}
                  onValueChange={value => setFormData(prev => ({
                    ...prev,
                    class_name: value
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRESCHOOL">Pre-School</SelectItem>
                    <SelectItem value="BASIC1">Basic 1</SelectItem>
                    <SelectItem value="BASIC2">Basic 2</SelectItem>
                    <SelectItem value="BASIC3">Basic 3</SelectItem>
                    <SelectItem value="BASIC4">Basic 4</SelectItem>
                    <SelectItem value="BASIC5">Basic 5</SelectItem>
                    <SelectItem value="BASIC6">Basic 6</SelectItem>
                    <SelectItem value="JSS1">JSS 1</SelectItem>
                    <SelectItem value="JSS2">JSS 2</SelectItem>
                    <SelectItem value="JSS3">JSS 3</SelectItem>
                    <SelectItem value="SSS1">SSS 1</SelectItem>
                    <SelectItem value="SSS2">SSS 2</SelectItem>
                    <SelectItem value="SSS3">SSS 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Session</Label>
                <Input
                  required
                  value={formData.session}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    session: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Term</Label>
                <Select
                  value={formData.term}
                  onValueChange={value => setFormData(prev => ({
                    ...prev,
                    term: value
                  }))}
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
            </div>

            {/* Subject Form */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium">Add Subject</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Subject Name</Label>
                  <Input
                    value={currentSubject.subject_name}
                    onChange={e => setCurrentSubject(prev => ({
                      ...prev,
                      subject_name: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CA Score</Label>
                  <Input
                    type="number"
                    value={currentSubject.ca_score}
                    onChange={e => setCurrentSubject(prev => ({
                      ...prev,
                      ca_score: Number(e.target.value)
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exam Score</Label>
                  <Input
                    type="number"
                    value={currentSubject.exam_score}
                    onChange={e => setCurrentSubject(prev => ({
                      ...prev,
                      exam_score: Number(e.target.value)
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Input
                    value={currentSubject.grade}
                    onChange={e => setCurrentSubject(prev => ({
                      ...prev,
                      grade: e.target.value
                    }))}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Teacher&apos;s Remark</Label>
                  <Textarea
                    value={currentSubject.teacher_remark}
                    onChange={e => setCurrentSubject(prev => ({
                      ...prev,
                      teacher_remark: e.target.value
                    }))}
                  />
                </div>
              </div>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={addSubject}
                className="mt-4 text-white"
              >
                Add Subject
              </Button>
            </div>

            {/* Added Subjects List */}
            {subjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Added Subjects</h3>
                <div className="space-y-2">
                  {subjects.map((subject, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{subject.subject_name}</p>
                        <p className="text-sm text-gray-500">
                          CA: {subject.ca_score} | Exam: {subject.exam_score} | Grade: {subject.grade}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubject(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position In Class</Label>
                <Input
                  type="number"
                  value={formData.position_in_class}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    position_in_class: Number(e.target.value)
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Attendance</Label>
                <Input
                  type="number"
                  value={formData.attendance}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    attendance: Number(e.target.value)
                  }))}
                />
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <h3 className="font-medium">Comments</h3>
              {formData.comments.map((comment, index) => (
                <div key={index} className="space-y-2">
                  <Label>Comment</Label>
                  <Textarea
                    value={comment.comment}
                    onChange={e => {
                      const newComments = [...formData.comments]
                      newComments[index].comment = e.target.value
                      setFormData(prev => ({ ...prev, comments: newComments }))
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t pt-6">
              <h3 className="font-medium">Teacher & Principal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teacher's Name</Label>
                  <Input
                    required
                    value={formData.teacher_name}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      teacher_name: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Principal's Name</Label>
                  <Input
                    required
                    value={formData.principal_name}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      principal_name: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Teacher's Remark</Label>
                <Textarea
                  required
                  value={formData.teacher_remark}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    teacher_remark: e.target.value
                  }))}
                  placeholder="General comment about the student's performance"
                />
              </div>

              <div className="space-y-2">
                <Label>Principal's Remark</Label>
                <Textarea
                  required
                  value={formData.principal_remark}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    principal_remark: e.target.value
                  }))}
                  placeholder="Principal's comment about the student's performance"
                />
              </div>
              {/* </div> */}
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Report Card"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </motion.div>
  )
}

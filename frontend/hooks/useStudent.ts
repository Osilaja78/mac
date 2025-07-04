import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StudentData {
  full_name: string;
  admission_number: string;
  current_class: string;
  guardian_name: string;
  guardian_email: string;
  guardian_phone: string;
	profile_image: string;
  report_cards: ReportCard[];
}

interface SubjectScore {
  subject_name: string;
  ca_score: number;
  exam_score: number;
  total_score: number;
  grade: string;
  teacher_remark: string;
}

interface ReportCard {
  id: number;
  term: string;
  session: string;
  class_name: string;
  position_in_class: number;
  total_students: number;
  attendance: number;
  subjects: SubjectScore[];
  date_generated: string;
}

export function useStudent() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) {
          router.push('/portal/login');
          return;
        }

        const response = await fetch(`${API_URL}/students/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [router])

  return { student, loading, error };
}

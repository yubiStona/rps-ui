// src/data/mockData.ts
import { Student, Course, Mark, Faculty, Program } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    registrationNo: '2023001',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    faculty: 'Computer Science',
    program: 'BSc Computer Science',
    semester: 3,
    contact: '+1234567890',
    createdAt: new Date('2023-09-01')
  },
  {
    id: '2',
    registrationNo: '2023002',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    faculty: 'Computer Science',
    program: 'BSc Computer Science',
    semester: 3,
    contact: '+1234567891',
    createdAt: new Date('2023-09-01')
  },
  {
    id: '3',
    registrationNo: '2023003',
    name: 'Mike Johnson',
    email: 'mike.johnson@university.edu',
    faculty: 'Engineering',
    program: 'BSc Electrical Engineering',
    semester: 2,
    contact: '+1234567892',
    createdAt: new Date('2023-09-01')
  }
];

export const mockTeachers = [
  {
    id: '1',
    employeeId: 'T001',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    faculty: 'Computer Science',
    department: 'Computer Science',
    contact: '+1234567800',
    courses: ['CS101', 'CS102']
  },
  {
    id: '2',
    employeeId: 'T002',
    name: 'Prof. David Brown',
    email: 'david.brown@university.edu',
    faculty: 'Engineering',
    department: 'Electrical Engineering',
    contact: '+1234567801',
    courses: ['EE201', 'EE202']
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    faculty: 'Computer Science',
    program: 'BSc Computer Science',
    semester: 1,
    credits: 4
  },
  {
    id: '2',
    code: 'CS102',
    name: 'Data Structures',
    faculty: 'Computer Science',
    program: 'BSc Computer Science',
    semester: 2,
    credits: 4
  },
  {
    id: '3',
    code: 'EE201',
    name: 'Circuit Analysis',
    faculty: 'Engineering',
    program: 'BSc Electrical Engineering',
    semester: 2,
    credits: 3
  }
];

export const mockMarks: Mark[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    marks: {
      assignment: 22,
      midterm: 24,
      final: 35,
      practical: 9
    },
    total: 90,
    average: 90,
    grade: 'A+'
  },
  {
    id: '2',
    studentId: '2',
    courseId: '1',
    marks: {
      assignment: 20,
      midterm: 22,
      final: 32,
      practical: 8
    },
    total: 82,
    average: 82,
    grade: 'A'
  }
];

export const mockFaculties: Faculty[] = [
  { id: '1', name: 'Computer Science', code: 'CS' },
  { id: '2', name: 'Engineering', code: 'ENG' },
  { id: '3', name: 'Business Administration', code: 'BUS' },
  { id: '4', name: 'Arts and Sciences', code: 'ART' }
];

export const mockPrograms: Program[] = [
  { id: '1', name: 'BSc Computer Science', code: 'BSC-CS', facultyId: '1', duration: 4 },
  { id: '2', name: 'BSc Information Technology', code: 'BSC-IT', facultyId: '1', duration: 4 },
  { id: '3', name: 'BSc Electrical Engineering', code: 'BSC-EE', facultyId: '2', duration: 4 },
  { id: '4', name: 'Bachelor of Business Administration', code: 'BBA', facultyId: '3', duration: 3 }
];
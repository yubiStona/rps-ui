// src/data/mockData.ts
import { Student, Course, Mark, Faculty, Program } from '../types';

export const mockStudents: Student[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1234567890',
    roll_no: 'CS2023001',
    enrollment_date: '2023-09-01',
    status: 'A',
    registration_no: 'REG2023001',
    gender: 'M',
    dob: '2002-05-15',
    address1: '123 University Road',
    address2: 'Room 101, Block A',
    current_semester: 3,
    program_id: 1,
    program_name: 'BSc Computer Science',
    is_passed: 0,
    created_at: '2023-09-01T10:30:00Z',
    updated_at: '2024-01-15T14:20:00Z'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@university.edu',
    phone: '+1234567891',
    roll_no: 'CS2023002',
    enrollment_date: '2023-09-01',
    status: 'A',
    registration_no: 'REG2023002',
    gender: 'F',
    dob: '2003-02-20',
    address1: '456 College Avenue',
    address2: 'Room 205, Block B',
    current_semester: 3,
    program_id: 1,
    program_name: 'BSc Computer Science',
    is_passed: 0,
    created_at: '2023-09-01T11:15:00Z',
    updated_at: '2024-01-15T15:30:00Z'
  },
  {
    id: 3,
    first_name: 'Michael',
    last_name: 'Johnson',
    email: 'michael.johnson@university.edu',
    phone: '+1234567892',
    roll_no: 'EE2023001',
    enrollment_date: '2023-09-01',
    status: 'A',
    registration_no: 'REG2023003',
    gender: 'M',
    dob: '2001-11-10',
    address1: '789 Engineering Street',
    address2: 'Room 312, Block C',
    current_semester: 2,
    program_id: 4,
    program_name: 'BSc Electrical Engineering',
    is_passed: 0,
    created_at: '2023-09-01T09:45:00Z',
    updated_at: '2024-01-10T10:15:00Z'
  },
  {
    id: 4,
    first_name: 'Sarah',
    last_name: 'Williams',
    email: 'sarah.williams@university.edu',
    phone: '+1234567893',
    roll_no: 'IT2023001',
    enrollment_date: '2023-09-01',
    status: 'P',
    registration_no: 'REG2023004',
    gender: 'F',
    dob: '2002-08-05',
    address1: '321 Tech Park',
    address2: 'Room 108, Block D',
    current_semester: 4,
    program_id: 2,
    program_name: 'BSc Information Technology',
    is_passed: 0,
    created_at: '2023-09-01T14:20:00Z',
    updated_at: '2024-01-12T16:45:00Z'
  },
  {
    id: 5,
    first_name: 'Robert',
    last_name: 'Brown',
    email: 'robert.brown@university.edu',
    phone: '+1234567894',
    roll_no: 'BBA2023001',
    enrollment_date: '2023-09-01',
    status: 'A',
    registration_no: 'REG2023005',
    gender: 'M',
    dob: '2001-03-25',
    address1: '654 Business Center',
    address2: null,
    current_semester: 5,
    program_id: 3,
    program_name: 'Bachelor of Business Administration',
    is_passed: 0,
    created_at: '2023-09-01T13:10:00Z',
    updated_at: '2024-01-14T09:30:00Z'
  },
  {
    id: 6,
    first_name: 'Emily',
    last_name: 'Davis',
    email: 'emily.davis@university.edu',
    phone: '+1234567895',
    roll_no: 'COM2023001',
    enrollment_date: '2022-09-01',
    status: 'A',
    registration_no: 'REG2022001',
    gender: 'F',
    dob: '2000-12-12',
    address1: '987 Commerce Lane',
    address2: 'Apartment 42',
    current_semester: 8,
    program_id: 5,
    program_name: 'Bachelor of Commerce',
    is_passed: 1,
    created_at: '2022-09-01T08:45:00Z',
    updated_at: '2024-01-10T11:20:00Z'
  },
  {
    id: 7,
    first_name: 'David',
    last_name: 'Miller',
    email: 'david.miller@university.edu',
    phone: '+1234567896',
    roll_no: 'CS2022002',
    enrollment_date: '2022-09-01',
    status: 'S',
    registration_no: 'REG2022002',
    gender: 'M',
    dob: '2000-07-30',
    address1: '147 Software Avenue',
    address2: 'Room 401, Block E',
    current_semester: 6,
    program_id: 1,
    program_name: 'BSc Computer Science',
    is_passed: 0,
    created_at: '2022-09-01T10:00:00Z',
    updated_at: '2024-01-05T14:50:00Z'
  },
  {
    id: 8,
    first_name: 'Lisa',
    last_name: 'Wilson',
    email: 'lisa.wilson@university.edu',
    phone: '+1234567897',
    roll_no: 'EE2022002',
    enrollment_date: '2022-09-01',
    status: 'A',
    registration_no: 'REG2022003',
    gender: 'F',
    dob: '2000-04-18',
    address1: '258 Circuit Road',
    address2: null,
    current_semester: 7,
    program_id: 4,
    program_name: 'BSc Electrical Engineering',
    is_passed: 0,
    created_at: '2022-09-01T11:30:00Z',
    updated_at: '2024-01-08T13:15:00Z'
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
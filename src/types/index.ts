export interface User {
  userid: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string;
  token: string | null;
  token_type: string | null;
  roles: Role[] | null;
  profile: string | null;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roll_no: string;
  enrollment_date: string;
  status: 'A' | 'P' | 'S';
  registration_no: string;
  gender: 'M' | 'F' | 'O';
  dob: string;
  address1: string;
  address2: string | null;
  current_semester: number;
  program_id: number;
  program_name?: string; // For display purposes
  is_passed: number;
  created_at?: string;
  updated_at?: string;
}

export interface Teacher {
  id: number;
  first_name:string;
  last_name:string;
  email: string;
  phone: string | null;
  address1: string;
  address2: string | null;
  gender: 'M' | 'F' | 'O';
  dob: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  program: string;
  semester: number;
  credits: number;
}

export interface Mark {
  id: string;
  studentId: string;
  courseId: string;
  marks: {
    assignment: number;
    midterm: number;
    final: number;
    practical?: number;
  };
  total: number;
  average: number;
  grade: string;
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  duration: number;
}
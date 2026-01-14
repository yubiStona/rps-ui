export interface Program {
  id: number;
  name: string;
  code: string;
}

export interface SubjectListParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface SubjectListResponse {
  success: boolean;
  message: string;
  data: Subject[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
//subject interface
export interface Subject {
  id: number;
  name: string;
  code: string;
  credits: number;
  semester: number;
  type: string;
  subjectTeacher: Teacher | null;
  program: Program;
  createdAt: string;
}

export interface TeacherList {
  id: number;
  name: string;
}

export interface TeacherListDropdown {
  success: boolean;
  statusCode: number;
  message: string;
  data: TeacherList[];
}

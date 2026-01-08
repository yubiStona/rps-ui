export interface ProgramListParams {
  search?: string;
  page?: number;
  limit?: number;
}
export interface HOD {
  id: number;
  name: string;
  email: string;
}
export interface Faculty {
  name: string;
}

export interface Program {
  id: number;
  name: string;
  code: string;
  totalSubjects: number;
  totalSemesters: number;
  totalCredits: number;
  durationInYears: number;
  hod: HOD;
  faculty: Faculty;
  createdAt: string;
}

export interface ProgramListResponse {
  success: boolean;
  message: string;
  data: Program[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

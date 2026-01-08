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
  id:number;
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

export interface HODList{
  id:number,
  name:string
}
export interface HodListResponse {
  success: boolean;
  message: string;
  data:HODList[]
}

// In utils.ts
export interface ProgramFormData {
    name: string;
    code: string;
    facultyId: string;
    totalSemesters: number;
    totalSubjects: number;
    totalCredits: number;
    durationInYears: number;
    hodId: string; 
}

export interface ProgramAPIData {
    name: string;
    code: string;
    facultyId: number;
    totalSemesters: number;
    totalSubjects: number;
    totalCredits: number;
    durationInYears: number;
    hodId: number;
}

export interface PartialProgramFormData {
    name?: string;
    code?: string;
    facultyId?: string;
    totalSemesters?: number;
    totalSubjects?: number;
    totalCredits?: number;
    durationInYears?: number;
    hodId?: string;
}

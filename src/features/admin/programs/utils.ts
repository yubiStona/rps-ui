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
export interface ProgramFormData {
    name: string;
    code: string;
    facultyId:  string | number;
    totalSemesters: number;
    totalSubjects: number;
    totalCredits: number;
    durationInYears: number;
    hodId: string | number;
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

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  currentSemester: number;
  status: "A" | "P" | "S";
  registrationNumber: string;
  gender: "F" | "M" | "O";
  program: {
    name: string;
  };
  createdAt: string;
}

export interface studentListParams {
  search?: string;
  page?: number;
  limit?: number;
  currentSemester?:number;
  programId?:number;
  status?:string;
}

export interface StudentListApiReponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Student[];
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

export interface ProgramList{
    id:number;
    code:string;
}


export interface ProgramListApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProgramList[]
}

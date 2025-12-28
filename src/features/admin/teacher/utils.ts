export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  gender: "M" | "F" | "O";
  createdAt: string;
}

export interface TeacherListParams {
  search?: string;
  page?: number;
  limit?: number;
  gender?: string;
}

export interface TeacherListResponse {
  success: boolean;
  message: string;
  data: Teacher[];
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

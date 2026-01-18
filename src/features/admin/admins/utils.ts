export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  gender: "M" | "F" | "O";
  createdAt: string;
  DOB?: string;
}

export interface AdminListParams {
  search?: string;
  page?: number;
  limit?: number;
  gender?: string;
}

export interface AdminListResponse {
  success: boolean;
  message: string;
  data: Admin[];
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

export interface AdminDetailResponseById {
  success: boolean;
  message: string;
  data: Admin[];
}

export interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  gender: "M" | "F" | "O";
  DOB: string;
}

export type TeacherEditFormData = Partial<AdminFormData>;

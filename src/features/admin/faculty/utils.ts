interface Program{
    id:string;
    code:string;
}

export interface Faculty {
    id:number;
    name:string;
    description:string;
    program:Program[]
}
export interface FacultyListResponse {
    success:true;
    message:string;
    data:Faculty[]
    total:number;
    page:number;
    limit:number;
    lastPage:number;
}

export interface FacultyListParams {
  search?: string;
  page?: number;
  limit?: number;
}
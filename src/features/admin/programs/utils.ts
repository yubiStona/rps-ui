export interface ProgramListParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface Program{
    id:number;
    name:string;
    code:string;
}

export interface ProgramListResponse {
    success:boolean;
    message:string;
    data:Program[];
    total:number;
    page:number;
    limit:number;
    lastPage:number;
}
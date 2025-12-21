export interface StudentDistribution {
  [programName: string]: number;
}

export interface StatisticsAPiResponse {
    success:boolean;
    statusCode:number;
    message:string;
    data:{
        faculties:number,
        programs:number,
        subjects:number,
        teachers:number,
        students:{
            active:number,
            passed:number,
            total:number
        },
        studentsDistributions:StudentDistribution
    }
}




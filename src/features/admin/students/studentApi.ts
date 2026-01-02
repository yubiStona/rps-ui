import { createApi } from "@reduxjs/toolkit/query/react";
import  baseQuery  from "../../api/apislice";
import AdminStudentEndpoints from "./endpoints";
import { StudentListApiReponse,studentListParams,ProgramListApiResponse,StudentDetailApiResponse } from "./utils";

export const adminStudentApi = createApi({
    reducerPath:"adminStudentApi",
    baseQuery,
    tagTypes:["Students"],
    endpoints: (builder) => ({
        getStudents:builder.query<StudentListApiReponse,studentListParams>({
            query:(params={}) => {
                const queryParams = new URLSearchParams();
                if (params.search && params.search.trim()) {
                  queryParams.append("search", params.search.trim());
                }

                if(params.programId){
                    queryParams.append("programId",params.programId.toString());
                }

                if(params.currentSemester){
                    queryParams.append("currentSemester",params.currentSemester.toString());
                }

                if(params.status && params.status.trim()){
                    queryParams.append("status",params.status);
                }

                if (params.page) {
                  queryParams.append("page", params.page.toString());
                }
            
                if (params.limit) {
                  queryParams.append("limit", params.limit.toString());
                }

                const queryString = queryParams.toString();

            return {   
                url:`${AdminStudentEndpoints.GET_STUDENTS}${queryString ? `?${queryString}` : ""}`,
                method:"GET"
            }},
            providesTags: ["Students"]
        }),

        getPrograms: builder.query<ProgramListApiResponse,void>({
            query: ()=>({
                url:AdminStudentEndpoints.PROGRAM_LIST,
                method:"GET"
            })
        }),

        deleteStudent: builder.mutation ({
            query: (id) => ({
                url:`${AdminStudentEndpoints.STUDENT_ACTION}/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: (result) => result?.success ? ["Students"] : [],
        }),

        addStudent: builder.mutation({
            query: (data)=>({
                url:AdminStudentEndpoints.STUDENT_ACTION,
                method:"POST",
                body:data
            }),
            invalidatesTags: (result) => result?.success ? ["Students"] : []
        }),

        getStudentById: builder.query<StudentDetailApiResponse, number>({
            query: (id) => ({
                url: `${AdminStudentEndpoints.GET_STUDENTS}/${id}`,
                method: "GET"
            }),
            providesTags: (result, error, id) => [{ type: "Students", id }]
        })

    })
})

export const {
    useGetStudentsQuery,
    useGetProgramsQuery,
    useDeleteStudentMutation,
    useAddStudentMutation,
    useGetStudentByIdQuery
} = adminStudentApi;
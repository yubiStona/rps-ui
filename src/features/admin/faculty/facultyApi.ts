import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { FacultyEndpoints } from "./endpoints";
import { FacultyListResponse,FacultyListParams } from "./utils";


export const facultyApi = createApi({
    reducerPath:"facultyApi",
    tagTypes:["Faculties"],
    baseQuery,
    endpoints:(builder) => ({
        getFaculties: builder.query<FacultyListResponse,FacultyListParams>({
            query:(params={})=>({
                url:FacultyEndpoints.Faculty_Action,
                method:"GET",
                params
            }),
            providesTags: ["Faculties"]
        }),
        addFaculty:builder.mutation({
            query:(data)=>({
                url:FacultyEndpoints.Faculty_Action,
                method:"POST",
                body:data
            }),
            invalidatesTags: (result) => result?.success ? ["Faculties"] :[]
        }),
        editFaculty:builder.mutation({
            query:({data,id})=>({
                url:`${FacultyEndpoints.Faculty_Action}/${id}`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags: (result) => result?.success ? ["Faculties"] :[]
        }),
        deleteFaculty:builder.mutation({
            query:(id)=>({
                url:`${FacultyEndpoints.Faculty_Action}/${id}`,
                method:"DELETE",
            }),
            invalidatesTags: (result) => result?.success ? ["Faculties"] :[]
        })
    })
})

export const {
    useGetFacultiesQuery,
    useAddFacultyMutation,
    useEditFacultyMutation,
    useDeleteFacultyMutation
} = facultyApi
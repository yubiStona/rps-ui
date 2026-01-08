import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { ProgramEndpoints } from "./endpoints";
import { ProgramListResponse,ProgramListParams, HodListResponse } from "./utils";


export const programApi = createApi({
    reducerPath:"programAPi",
    tagTypes:["Programs"],
    baseQuery,
    endpoints: (builder) =>({
        getPrograms: builder.query<ProgramListResponse,ProgramListParams>({
            query:(params={})=>({
                url:ProgramEndpoints.PROGRAM_ACTION,
                method:"GET",
                params
            }),
            providesTags:["Programs"]
        }),
        getHodList: builder.query<HodListResponse,void>({
            query:()=>({
                url:ProgramEndpoints.HOD_LIST,
                method:"GET"
            })
        }),
        addProgram:builder.mutation({
            query:(data)=>({
                url:ProgramEndpoints.PROGRAM_ACTION,
                method:"POST",
                body:data
            }),
            invalidatesTags:(result) => result?.success ? ["Programs"] : []
        }),
        deleteProgram: builder.mutation({
            query:(id)=>({
                url:`${ProgramEndpoints.PROGRAM_ACTION}/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:(result) => result?.success ? ["Programs"] : []
        }),
        editProgram:builder.mutation({
            query:({data,id})=>({
                url:`${ProgramEndpoints.PROGRAM_ACTION}/${id}`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:(result) => result?.success ? ["Programs"] : []
        })
    })
})

export const {
    useGetProgramsQuery,
    useGetHodListQuery,
    useAddProgramMutation,
    useDeleteProgramMutation,
    useEditProgramMutation
} =programApi;
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { ProgramEndpoints } from "./endpoints";
import { ProgramListResponse,ProgramListParams } from "./utils";


export const programApi = createApi({
    reducerPath:"programAPi",
    baseQuery,
    endpoints: (builder) =>({
        getPrograms: builder.query<ProgramListResponse,ProgramListParams>({
            query:(params={})=>({
                url:ProgramEndpoints.PROGRAM_ACTION,
                method:"GET",
                params
            })
        })
    })
})

export const {useGetProgramsQuery} =programApi;
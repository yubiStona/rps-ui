import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { AdminTeacherEndpoints } from "./endpoints";
import { TeacherListResponse, TeacherListParams, TeacherDetailResponseById } from "./utils";

export const adminTeacherApi = createApi({
    reducerPath:"adminTeacherApi",
    tagTypes:["Teacher"],
    baseQuery,
    endpoints: (builder) => ({
        getTeacher: builder.query<TeacherListResponse,TeacherListParams>({
            query:(params={})=>{
                const queryParams = new URLSearchParams();
                if(params.search && params.search.trim()){
                    queryParams.append("search",params.search.trim());
                }

                if(params.limit) {
                    queryParams.append("limit", params.limit.toString());
                }

                if(params.page) {
                    queryParams.append("page", params.page.toString());
                }

                if(params.gender && params.gender !=="all") {
                    queryParams.append("gender", params.gender);
                }

                const queryString = queryParams.toString();

                return{
                    url:`${AdminTeacherEndpoints.LIST_TEACHER}${queryString ? `?${queryString}` : ""}`,
                    method:"GET"
                }
            },
            providesTags:["Teacher"]
        }),

        addTeacher: builder.mutation({
            query: (data)=>({
                url:AdminTeacherEndpoints.TEACHER_ACTION,
                method:"POST",
                body:data,
            }),
            invalidatesTags: (result) =>result?.success ? ["Teacher"] : []
        }),

        editTeacher:builder.mutation({
            query: ({data,id})=>({
                url:`${AdminTeacherEndpoints.TEACHER_ACTION}/${id}`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:(result) => result?.success ? ["Teacher"] : []
        }),

        deleteTeacher: builder.mutation({
            query:(id)=>({
                url:`${AdminTeacherEndpoints.TEACHER_ACTION}/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:(result) => result?.success ? ["Teacher"] : []
        }),

        getTeacherById: builder.query<TeacherDetailResponseById,number>({
            query: (id) => ({
                url: `${AdminTeacherEndpoints.TEACHER_ACTION}?id=${id}`,
                method: "GET"
            })
        })
    })
})

export const {
    useGetTeacherQuery,
    useGetTeacherByIdQuery,
    useAddTeacherMutation,
    useDeleteTeacherMutation,
    useEditTeacherMutation
} = adminTeacherApi
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { AdminTeacherEndpoints } from "./endpoints";
import { TeacherListResponse, TeacherListParams } from "./utils";

export const adminTeacherApi = createApi({
    reducerPath:"adminTeacherApi",
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
            }
        })
    })
})

export const {
    useGetTeacherQuery
} = adminTeacherApi
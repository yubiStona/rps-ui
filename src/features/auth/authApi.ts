import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api/apislice"; 

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery,
    endpoints: (builder)=> ({
        loginUser: builder.mutation({
            query: (data)=>({
                url:"/auth/login",
                method:"POST",
                body:data,
            }),
        })
    })

})

export const {
    useLoginUserMutation
} = authApi;
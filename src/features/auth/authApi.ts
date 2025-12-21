import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../api/apislice"; 

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
        }),
        verifyEmail:builder.mutation({
            query:(data)=>({
                url:"auth/verify-email",
                method:'POST',
                body:data,
            })
        }),
        verifyOTP:builder.mutation({
            query:(data)=>({
                url:"auth/validate-otp",
                method:"POST",
                body:data,
            })
        }),
        resetPassword:builder.mutation({
            query:(data)=>({
                url:"auth/reset-password",
                method:"POST",
                body:data,
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:"auth/logout",
                method:"post",
            })
        })
    })

})

export const {
    useLoginUserMutation,
    useVerifyEmailMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
    useLogoutMutation,
} = authApi;
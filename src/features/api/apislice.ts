import {fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { RootState } from "../../app/store"

export const baseQuery = fetchBaseQuery({
    baseUrl:import.meta.env.VITE_BASE_URL,
    credentials:"include",
    prepareHeaders: (headers,{getState}) =>{
        const token = (getState() as RootState).auth.user?.token;
        if(token){
            headers.set("Authorization", `Bearer ${token}`);
            headers.set("Accept", "application/json");
        }
        return headers;
    },
})
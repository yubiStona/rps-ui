import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../api/apislice";
import AdminEndpoints from "./endpoints";

export const dashBoardApi = createApi({
    reducerPath:"dashboardApi",
    baseQuery,
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: () => ({
                url:AdminEndpoints.DASHBOARD_STATISTICS,
            })
        })
    })
})

export const {useGetStatisticsQuery} = dashBoardApi;
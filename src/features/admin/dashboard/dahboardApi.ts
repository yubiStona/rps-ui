import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../api/apislice";
import AdminEndpoints from "./endpoints";
import { StatisticsAPiResponse } from "./utils";

export const dashboardApi = createApi({
    reducerPath:"dashboardApi",
    baseQuery,
    endpoints: (builder) => ({
        getStatistics: builder.query<StatisticsAPiResponse,void>({
            query: () => ({
                url:AdminEndpoints.DASHBOARD_STATISTICS,
                method:"GET"
            })
        })
    })
})

export const {useGetStatisticsQuery} = dashboardApi;
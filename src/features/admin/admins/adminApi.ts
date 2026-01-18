import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { AdminEndpoints } from "./endpoints";
import {
  AdminListResponse,
  AdminListParams,
  AdminDetailResponseById,
} from "./utils";

export const adminApi = createApi({
  reducerPath: "adminApi",
  tagTypes: ["Admin"],
  baseQuery,
  endpoints: (builder) => ({
    getAdmin: builder.query<AdminListResponse, AdminListParams>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.search && params.search.trim()) {
          queryParams.append("search", params.search.trim());
        }

        if (params.limit) {
          queryParams.append("limit", params.limit.toString());
        }

        if (params.page) {
          queryParams.append("page", params.page.toString());
        }

        if (params.gender && params.gender !== "all") {
          queryParams.append("gender", params.gender);
        }

        const queryString = queryParams.toString();

        return {
          url: `${AdminEndpoints.LIST_ADMIN}${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Admin"],
    }),

    addAdmin: builder.mutation({
      query: (data) => ({
        url: AdminEndpoints.ADMIN_ACTION,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result?.success ? ["Admin"] : []),
    }),

    editAdmin: builder.mutation({
      query: ({ data, id }) => ({
        url: `${AdminEndpoints.ADMIN_ACTION}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result?.success ? ["Admin"] : []),
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `${AdminEndpoints.ADMIN_ACTION}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result?.success ? ["Admin"] : []),
    }),

    getAdminById: builder.query<AdminDetailResponseById, number>({
      query: (id) => ({
        url: `${AdminEndpoints.ADMIN_ACTION}?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAdminQuery,
  useGetAdminByIdQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
  useEditAdminMutation,
} = adminApi;

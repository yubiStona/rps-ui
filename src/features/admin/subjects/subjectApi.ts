import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { SubjectsEndpoints } from "./endpoints";
import { SubjectListResponse, SubjectListParams } from "./utils";

export const subjectAPi = createApi({
  reducerPath: "subjectAPi",
  tagTypes:["Subject"],
  baseQuery,
  endpoints: (builder) => ({
    getSubjects: builder.query<SubjectListResponse, SubjectListParams>({
      query: (params = {}) => ({
        url: SubjectsEndpoints.SUBJECT_ACTION,
        method: "GET",
        params,
      }),
      providesTags:["Subject"]
    }),
    addSubject: builder.mutation({
      query: (data) => ({
        url:  SubjectsEndpoints.SUBJECT_ACTION,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result?.success ? ["Subject"] : []),
    }),
  }),
});

export const { useGetSubjectsQuery, useAddSubjectMutation } = subjectAPi;

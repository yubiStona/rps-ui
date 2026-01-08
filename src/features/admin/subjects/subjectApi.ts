import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../api/apislice";
import { SubjectsEndpoints } from "./endpoints";
import { SubjectListResponse, SubjectListParams } from "./utils";

export const subjectAPi = createApi({
  reducerPath: "subjectAPi",
  baseQuery,
  endpoints: (builder) => ({
    getSubjects: builder.query<SubjectListResponse, SubjectListParams>({
      query: (params = {}) => ({
        url: SubjectsEndpoints.SUBJECT_ACTION,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetSubjectsQuery } = subjectAPi;

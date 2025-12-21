import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { clearCredentials } from "../auth/authSlice";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(clearCredentials());
      history.push("/");
    }
  }

  return result;
};

export default baseQueryWithReauth;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://637fbe062f8f56e28e9587ed.mockapi.io";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => API_ENDPOINT,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: API_ENDPOINT,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateCommentCount: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentCountMutation,
  useDeleteCommentMutation,
} = commentApi;

import { apiSlice } from '../../app/apiSlice.js';

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsForProperty: builder.query({
      query: (propertyId) => `/reviews/property/${propertyId}`,
      providesTags: ['Review'],
    }),
    createReview: builder.mutation({
      query: (body) => ({ url: '/reviews', method: 'POST', body }),
      invalidatesTags: ['Review'],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({ url: `/reviews/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const { useGetReviewsForPropertyQuery, useCreateReviewMutation, useDeleteReviewMutation } =
  reviewsApi;

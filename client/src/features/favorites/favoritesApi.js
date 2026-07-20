import { apiSlice } from '../../app/apiSlice.js';

export const favoritesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyFavorites: builder.query({
      query: () => '/favorites',
      providesTags: ['Favorite'],
    }),
    addFavorite: builder.mutation({
      query: (body) => ({ url: '/favorites', method: 'POST', body }),
      invalidatesTags: ['Favorite'],
    }),
    removeFavorite: builder.mutation({
      query: (id) => ({ url: `/favorites/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Favorite'],
    }),
  }),
});

export const { useGetMyFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } =
  favoritesApi;

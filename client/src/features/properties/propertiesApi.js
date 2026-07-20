import { apiSlice } from '../../app/apiSlice.js';

export const propertiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (params) => ({ url: '/properties', params }),
      providesTags: ['Property'],
    }),
    getProperty: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: ['Property'],
    }),
    getMyProperties: builder.query({
      query: () => '/properties/mine',
      providesTags: ['Property'],
    }),
    createProperty: builder.mutation({
      query: (body) => ({ url: '/properties', method: 'POST', body }),
      invalidatesTags: ['Property'],
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/properties/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Property'],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({ url: `/properties/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Property'],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetMyPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApi;

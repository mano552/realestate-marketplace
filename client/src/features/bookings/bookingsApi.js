import { apiSlice } from '../../app/apiSlice.js';

export const bookingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookings: builder.query({
      query: () => '/bookings/mine',
      providesTags: ['Booking'],
    }),
    getBookingsReceived: builder.query({
      query: () => '/bookings/received',
      providesTags: ['Booking'],
    }),
    createBooking: builder.mutation({
      query: (body) => ({ url: '/bookings', method: 'POST', body }),
      invalidatesTags: ['Booking'],
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/bookings/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Booking'],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({ url: `/bookings/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetMyBookingsQuery,
  useGetBookingsReceivedQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi;

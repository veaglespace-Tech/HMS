import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8080/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // You can inject auth tokens here later
      return headers;
    },
  }),
  tagTypes: ['Patient', 'Doctor', 'Appointment', 'Encounter', 'Bill'],
  endpoints: (builder) => ({
    // Patient Endpoints
    getPatients: builder.query<any[], void>({
      query: () => '/patients',
      providesTags: ['Patient'],
    }),
    createPatient: builder.mutation<any, any>({
      query: (patient) => ({
        url: '/patients',
        method: 'POST',
        body: patient,
      }),
      invalidatesTags: ['Patient'],
    }),
    
    // Doctor Endpoints
    getDoctors: builder.query<any[], void>({
      query: () => '/doctors',
      providesTags: ['Doctor'],
    }),
    
    // Appointment Endpoints
    getAppointments: builder.query<any[], void>({
      query: () => '/appointments',
      providesTags: ['Appointment'],
    }),

    // Pharmacy Endpoints
    getMedicines: builder.query<any[], void>({
      query: () => '/pharmacy/medicines',
      providesTags: ['Pharmacy'],
    }),

    // Laboratory Endpoints
    getLabOrders: builder.query<any[], void>({
      query: () => '/labs/orders',
      providesTags: ['Laboratory'],
    }),
  }),
});

export const { 
  useGetPatientsQuery, 
  useCreatePatientMutation,
  useGetDoctorsQuery,
  useGetAppointmentsQuery,
  useGetMedicinesQuery,
  useGetLabOrdersQuery
} = apiSlice;

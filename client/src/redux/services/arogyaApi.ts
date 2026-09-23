import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  code: string;
  monthlyPrice: number;
  annualPrice: number;
  maxUsers: number;
  maxBeds: number;
  featuresJson: string;
  active: boolean;
  sortOrder?: number;
}

export interface SlugCheckResponse {
  slug: string;
  available: boolean;
  message: string;
}

export interface HospitalRegistrationRequest {
  name: string;
  type: string;
  slug: string;
  registrationNo?: string;
  gstin?: string;
  addressLine1?: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  emergencyHelpline?: string;
  website?: string;
  bedCount?: number;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerDesignation?: string;
  ownerAadhaar?: string;
  ownerPan?: string;
  planId: string;
  billingCycle: "MONTHLY" | "ANNUAL";
}

export interface HospitalRegistrationResponse {
  registrationId: string;
  slug: string;
  status: string;
  email: string;
  ownerEmail: string;
  nextStep: string;
  message: string;
}

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const arogyaApi = createApi({
  reducerPath: "arogyaApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Add Authorization if token exists in localStorage
      if (typeof window !== "undefined") {
        try {
          const authData = localStorage.getItem("arogya_auth_rtk");
          if (authData) {
            const parsed = JSON.parse(authData);
            if (parsed?.token) {
              headers.set("Authorization", `Bearer ${parsed.token}`);
            }
          }
        } catch {}
      }
      return headers;
    },
  }),
  tagTypes: ["Plans", "Registration", "Tenant"],
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query<SubscriptionPlan[], void>({
      query: () => "/api/v1/public/subscription-plans",
      transformResponse: (response: ApiResponse<SubscriptionPlan[]>) =>
        response.data,
      providesTags: ["Plans"],
    }),

    checkSlugAvailability: builder.query<SlugCheckResponse, string>({
      query: (slug) =>
        `/api/v1/public/hospital-registrations/check-slug?slug=${encodeURIComponent(
          slug
        )}`,
      transformResponse: (response: ApiResponse<SlugCheckResponse>) =>
        response.data,
    }),

    registerHospital: builder.mutation<
      HospitalRegistrationResponse,
      HospitalRegistrationRequest
    >({
      query: (body) => ({
        url: "/api/v1/public/hospital-registrations",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: ApiResponse<HospitalRegistrationResponse>
      ) => response.data,
      invalidatesTags: ["Registration"],
    }),

    sendVerificationEmail: builder.mutation<void, string>({
      query: (registrationId) => ({
        url: `/api/v1/public/hospital-registrations/${registrationId}/verify-email`,
        method: "POST",
      }),
    }),

    verifyOtp: builder.mutation<void, { id: string; otp: string }>({
      query: ({ id, otp }) => ({
        url: `/api/v1/public/hospital-registrations/${id}/verify-otp`,
        method: "POST",
        body: { otp },
      }),
      invalidatesTags: ["Registration"],
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useLazyCheckSlugAvailabilityQuery,
  useRegisterHospitalMutation,
  useSendVerificationEmailMutation,
  useVerifyOtpMutation,
} = arogyaApi;

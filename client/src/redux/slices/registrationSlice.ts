import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FacilityType =
  | "CLINIC"
  | "POLYCLINIC"
  | "NURSING_HOME"
  | "MULTISPECIALTY"
  | "SUPERSPECIALTY"
  | "TRUST"
  | "DIAGNOSTIC_CENTRE"
  | "DAY_CARE"
  | "GOVERNMENT";

export interface RegistrationFormData {
  // Step 1: Hospital Details
  name?: string;
  type?: FacilityType;
  slug?: string;
  registrationNo?: string;
  gstin?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  bedCount?: number;

  // Step 2: Owner Details
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  ownerDesignation?: string;
  ownerAadhaar?: string;
  ownerPan?: string;

  // Step 3: Plan
  planId?: string;
  billingCycle?: "MONTHLY" | "ANNUAL";
}

interface RegistrationState {
  currentStep: number;
  formData: RegistrationFormData;
  registrationId: string | null;
  isSubmitting: boolean;
  isComplete: boolean;
}

const STORAGE_KEY = "arogya_reg_draft_rtk";

const getInitialRegistrationState = (): RegistrationState => {
  if (typeof window === "undefined") {
    return {
      currentStep: 0,
      formData: {},
      registrationId: null,
      isSubmitting: false,
      isComplete: false,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        currentStep: parsed.currentStep || 0,
        formData: parsed.formData || {},
        registrationId: parsed.registrationId || null,
        isSubmitting: false,
        isComplete: false,
      };
    }
  } catch {}
  return {
    currentStep: 0,
    formData: {},
    registrationId: null,
    isSubmitting: false,
    isComplete: false,
  };
};

const persistState = (state: RegistrationState) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentStep: state.currentStep,
          formData: state.formData,
          registrationId: state.registrationId,
        })
      );
    } catch {}
  }
};

const initialState: RegistrationState = getInitialRegistrationState();

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      persistState(state);
    },
    nextStep: (state) => {
      state.currentStep += 1;
      persistState(state);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(0, state.currentStep - 1);
      persistState(state);
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<RegistrationFormData>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
      persistState(state);
    },
    setRegistrationId: (state, action: PayloadAction<string>) => {
      state.registrationId = action.payload;
      persistState(state);
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
      if (action.payload && typeof window !== "undefined") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      }
    },
    resetRegistration: (state) => {
      state.currentStep = 0;
      state.formData = {};
      state.registrationId = null;
      state.isSubmitting = false;
      state.isComplete = false;
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      }
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  updateFormData,
  setRegistrationId,
  setSubmitting,
  setComplete,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;

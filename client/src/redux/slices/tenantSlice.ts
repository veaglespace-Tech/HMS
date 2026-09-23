import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TenantInfo {
  id: string;
  name: string;
  type: string;
  slug: string;
  logoUrl?: string;
  status: string;
  bedCount: number;
}

interface TenantState {
  currentTenant: TenantInfo | null;
  availableTenants: TenantInfo[];
}

const getInitialTenantState = (): TenantState => {
  if (typeof window === "undefined") {
    return { currentTenant: null, availableTenants: [] };
  }
  try {
    const raw = localStorage.getItem("arogya_tenant_rtk");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        currentTenant: parsed.currentTenant || null,
        availableTenants: parsed.availableTenants || [],
      };
    }
  } catch {}
  return { currentTenant: null, availableTenants: [] };
};

const initialState: TenantState = getInitialTenantState();

export const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    setCurrentTenant: (state, action: PayloadAction<TenantInfo | null>) => {
      state.currentTenant = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "arogya_tenant_rtk",
            JSON.stringify({
              currentTenant: state.currentTenant,
              availableTenants: state.availableTenants,
            })
          );
        } catch {}
      }
    },
    setAvailableTenants: (state, action: PayloadAction<TenantInfo[]>) => {
      state.availableTenants = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "arogya_tenant_rtk",
            JSON.stringify({
              currentTenant: state.currentTenant,
              availableTenants: state.availableTenants,
            })
          );
        } catch {}
      }
    },
    clearTenant: (state) => {
      state.currentTenant = null;
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("arogya_tenant_rtk");
        } catch {}
      }
    },
  },
});

export const { setCurrentTenant, setAvailableTenants, clearTenant } =
  tenantSlice.actions;
export default tenantSlice.reducer;

import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  setCurrentTenant: (tenant: TenantInfo | null) => void;
  clearTenant: () => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      currentTenant: null,
      setCurrentTenant: (tenant) => set({ currentTenant: tenant }),
      clearTenant: () => set({ currentTenant: null }),
    }),
    {
      name: "arogya-tenant-storage",
    }
  )
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  fullName?: string;
  isPlatformUser: boolean;
  roles: string[];
  hospitalId?: string;
  hospitalName?: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
}

const getInitialAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return { token: null, user: null, isAuthenticated: false };
  }
  try {
    const raw = localStorage.getItem("arogya_auth_rtk");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        token: parsed.token || null,
        user: parsed.user || null,
        isAuthenticated: !!parsed.token,
      };
    }
  } catch {
    // ignore json error
  }
  return { token: null, user: null, isAuthenticated: false };
};

const initialState: AuthState = getInitialAuthState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; user: UserProfile }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "arogya_auth_rtk",
            JSON.stringify({
              token: action.payload.token,
              user: action.payload.user,
            })
          );
        } catch {}
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "arogya_auth_rtk",
              JSON.stringify({ token: state.token, user: state.user })
            );
          } catch {}
        }
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("arogya_auth_rtk");
        } catch {}
      }
    },
  },
});

export const { setAuth, updateUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;

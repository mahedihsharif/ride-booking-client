import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// authSlice.ts
interface User {
  id: string;
  name: string;
  email: string;
  isActive: "ACTIVE" | "BLOCKED";
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload?.isActive === "ACTIVE") {
        state.user = action.payload;
      } else {
        state.user = null; // blocked user store এ যাবে না
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

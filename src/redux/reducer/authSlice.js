import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload?.isActive === "ACTIVE") {
                state.user = action.payload;
                state.token = action.payload.token || null;
            }
            else {
                state.user = null; // blocked user store এ যাবে না
                state.token = null;
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

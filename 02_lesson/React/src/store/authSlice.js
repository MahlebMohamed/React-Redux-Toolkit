import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoggedIn: false,
    name: 'Mohamed'
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logInOut: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});

export const { logInOut } = authSlice.actions;

export default authSlice.reducer;
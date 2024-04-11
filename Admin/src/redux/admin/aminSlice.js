import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentAdmin: null,
    error: null,
    loading: false,
};
const adminSlice = createSlice ({
    name : 'admin',
    initialState,
    reducers: {
        loginStart : (state) => {
            state.loading = true;
        },
        loginSuccess : (state, action) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure : (state , action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }

});

export const {loginStart, loginSuccess, loginFailure } = adminSlice.actions;
export default adminSlice.reducer;
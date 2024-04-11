import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStaff: null,
    loading: false,
    error: false,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.currentStaff = action.payload;
            state.loading = false;
            state.error = false;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.currentStaff = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    updateStart,
    updateSuccess,
    updateFailure,
} = staffSlice.actions;

export default staffSlice.reducer;

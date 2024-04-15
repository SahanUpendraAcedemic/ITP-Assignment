import { createSlice } from  '@reduxjs/toolkit';

const initialState = {

    currentSupplier : null,
    error : null,
    loading : false,
};

const supplierSlice = createSlice ({
    name: 'supplier',
    initialState,
    reducers: {
        loginStart : (state) => {
            state.loading = true;
        },

        loginSuccess: (state, action) => {
            state.currentSupplier = action.payload;
            state.loading =false;
            state.error = null;
        },

        loginFailure: (state, action) => {

            state.error = action.payload;
            state.loading = false;
        }, 
        updateSupplierStart: (state) => {
            state.loading = true;
        },
        updateSupplierSuccess: (state, action) => {
            state.currentSupplier = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateSupplierFailure: (state, action)  => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteSupplierStart: (state) => {
            state.loading = true;    
        },
        deleteSupplierSuccess: (state) => {
            state.currentSupplier = null;
            state.loading =  false;
            state.error = null;
        },
        deleteSupplierFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logOutSupplierStart: (state) => {
            state.loading = true;
        },
        logOutSupplierSuccess: (state) => {
            state.currentSupplier = null;
            state.loading = false;
            state.error = null;
        },
        logOutSupplierFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
    },
});

export const { loginStart, loginSuccess, loginFailure, updateSupplierStart, updateSupplierSuccess, updateSupplierFailure, deleteSupplierStart, deleteSupplierSuccess, deleteSupplierFailure, logOutSupplierStart, logOutSupplierSuccess, logOutSupplierFailure } = supplierSlice.actions;
export default supplierSlice.reducer;
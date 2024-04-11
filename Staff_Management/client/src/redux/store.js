import{configureStore} from '@reduxjs/toolkit';
import staffReducer from './staff/staffSlice';

export const store = configureStore({
    reducer : {staff : staffReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }),
});
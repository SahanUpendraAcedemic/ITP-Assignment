import { combineReducers, configureStore } from '@reduxjs/toolkit';
import supplierReducer  from './supplier/supplierSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers ({ supplier : supplierReducer})

const presistConfig = {
  key : 'root',
  storage,
  version : 1,
}
const persistedReducer = persistReducer (presistConfig, rootReducer)

export const store = configureStore({

  reducer: persistedReducer,

  middleware: (getDefaultMiddlrware) => 
  
  getDefaultMiddlrware ({
        serializableCheck: false,
  }),
});

export const persistor = persistStore(store);


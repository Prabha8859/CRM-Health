// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/loginauth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

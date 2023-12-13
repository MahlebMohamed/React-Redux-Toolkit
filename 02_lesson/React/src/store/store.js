import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "./BookSlice";
import authSlice from "./authSlice";


export const store = configureStore({
    reducer: {
        books: BookSlice,
        auth: authSlice,
    }
});
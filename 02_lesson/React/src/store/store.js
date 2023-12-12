import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "./BookSlice";


export const store = configureStore({
    reducer: {
        books: BookSlice
    }
});
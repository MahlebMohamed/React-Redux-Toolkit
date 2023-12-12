import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
    isLoading: true,
    error: null,
}

export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const response = await fetch('http://localhost:3005/books');
        const data = response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertBook = createAsyncThunk('book/insertBook', async (dataBook, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const response = await fetch('http://localhost:3005/books', {
            method: 'POST',
            body: JSON.stringify(dataBook),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // getBooks
            .addCase(getBooks.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // insertBooks
            .addCase(insertBook.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(insertBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books.push(action.payload);
            })
            .addCase(insertBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    }
});

export default bookSlice.reducer;
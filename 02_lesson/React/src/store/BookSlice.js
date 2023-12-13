import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
    bookInfo: null,
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
    const { rejectWithValue, getState } = thunkAPI;

    try {
        dataBook.userName = getState().auth.name;
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
});

export const deleteBook = createAsyncThunk('book/deleteBook', async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        await fetch(`http://localhost:3005/books/${book.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return book;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

// export const getBook = createAsyncThunk('book/getBook', async (id, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;

//     try {
//         const response = await fetch(`http://localhost:3005/books/${id}`);
//         const book = response.json();
//         return book;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// })

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        getBookInfo: (state, action) => {
            state.bookInfo = action.payload;
        }
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

            // deleteBooks
            .addCase(deleteBook.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = state.books.filter((book) => book.id !== action.payload.id);
                // console.log(action);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        // .addCase(getBook.fulfilled, (state, action) => {
        //     state.bookInfo = action.payload;
        // })
    }
});

export const { getBookInfo } = bookSlice.actions;

export default bookSlice.reducer;
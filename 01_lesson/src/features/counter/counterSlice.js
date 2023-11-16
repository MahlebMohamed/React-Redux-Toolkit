import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reste: (state) => {
            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        }
    }
});

export const { increment, decrement, reste, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
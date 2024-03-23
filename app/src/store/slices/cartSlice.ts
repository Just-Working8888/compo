import { createSlice } from '@reduxjs/toolkit';
import { fetchCartItems } from 'store/reducers/cartReduser';
import { Product } from 'types/types';


interface CartState {
    data: Product[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    loading: boolean
}

const initialState: CartState = {
    data: [],
    status: 'idle',
    error: null,
    loading: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.loading = false
            })
    },
});
export default cartSlice.reducer;

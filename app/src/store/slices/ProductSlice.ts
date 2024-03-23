import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems, fetchProductById } from 'store/reducers/producRedusers';
import { Product, ProductData, } from 'types/types';

interface ProductsState {
    data: Product[];
    singleProduct: Product | null;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: ProductsState = {
    data: [],
    status: 'idle',
    singleProduct: null,
    error: null,
    laoding: false
};


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch cart items' : 'Failed to fetch cart items';
                state.laoding = false
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleProduct = action.payload;
                state.laoding = false
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch product' : 'Failed to fetch product';
                state.laoding = false
            })

    },
});

export const { } = productSlice.actions;
export const selectProducts = (state: { products: ProductsState }) => state.products;

export default productSlice.reducer;

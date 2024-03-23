import { Product } from './../../types/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { api } from "../../api";


export const fetchCartItems = createAsyncThunk<Product[], { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'cart/fetchCartItems',
    async ({ }, { rejectWithValue }) => {
        try {
            const response = await api.getCartItems();
            return response.data as Product[];
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);

export const putCartItems = createAsyncThunk<Product, { id: number, body: Product, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'cart/putCartItems',
    async ({ id, body }, { rejectWithValue }) => {
        try {
            const response = await api.putCartItems(id, body);
            return response.data as Product;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);

export const DeleteCartItems = createAsyncThunk<Product[], { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'cart/DeleteCartItems',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.deleteCartItems(id);
            
            return response.data as Product[];
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);

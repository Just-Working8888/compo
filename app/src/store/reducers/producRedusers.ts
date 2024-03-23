import { Product } from './../../types/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { api } from "../../api";


export const fetchItems = createAsyncThunk<Product[], { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'cart/fetchItems',
    async ({ }, { rejectWithValue }) => {
        try {
            const response = await api.getProducts();
            return response.data as Product[];
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);
export const fetchProductById = createAsyncThunk<Product, { id: number; cancelToken?: CancelToken }, { rejectValue?: string }>(
    'products/fetchProductById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getProductsById(id);
            return response.data as Product;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch product');
        }
    }
);

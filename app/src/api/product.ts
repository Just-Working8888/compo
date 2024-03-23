import { CancelToken } from 'axios';
import { instance } from './index'
import { Product, ProductData } from 'types/types';

const getProducts = (
    sourceToken?: CancelToken
) =>
    instance.get<Product[]>(
        `items`,
        { cancelToken: sourceToken }
    );

const getProductsById = (id?: number, sourceToken?: CancelToken) =>
    instance.get<Product>(`/items/${id}`, {
        cancelToken: sourceToken,
    });


const endpoints = {
    getProducts,
    getProductsById
};
export default endpoints;
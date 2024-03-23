import { CancelToken } from 'axios';
import { instance } from './index'
import { Product } from 'types/types';

const getCartItems = (
    sourceToken?: CancelToken
) =>
    instance.get<Product[]>(
        `cart`,
        { cancelToken: sourceToken }
    );


const deleteCartItems = (
    id: number,
    sourceToken?: CancelToken
) =>
    instance.delete<Product[]>(
        `cart/${id}`,
        { cancelToken: sourceToken }
    );
const putCartItems = (
    id: number,
    body: Product,
    sourceToken?: CancelToken
) =>
    instance.put<Product>(
        `cart/${id}`, { ...body },
        { cancelToken: sourceToken }
    );
const endpoints = {
    getCartItems,
    deleteCartItems,
    putCartItems

};
export default endpoints;
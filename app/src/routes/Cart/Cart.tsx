// import { FC, useEffect } from "react";
import classes from './Cart.module.scss'
// import { useAppDispatch, useAppSelector } from "store/hook";
// import axios from "axios";
// import { fetchCartItems } from "store/reducers/cartReduser";


// const Cart: FC = () => {
//     const { data } = useAppSelector((state) => state.cart)
//     const dispatch = useAppDispatch()
//     useEffect(() => {
//         const source = axios.CancelToken.source();
//         dispatch(fetchCartItems({ cancelToken: source.token }))
//     }, [])
//     return (
//         <div className={classes.main}>
//             {data.map((item) => <div>{item.title}</div>)}
//         </div >
//     );
// };

// export default Cart;import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CartCard, Promotion } from 'Components';
import { api } from 'api';
import { IPromotionCard } from 'interfaces';
import { sliceText } from 'helpers/sliceText';
import { PromotionSkeleton } from 'Components/Skeleton';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchCartItems } from 'store/reducers/cartReduser';
import { fetchItems } from 'store/reducers/producRedusers';

const ProductList: React.FC = () => {
    const { data } = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchCartItems({ cancelToken: source.token }))
    }, [])




    return (
        <div className={classes.cart}>
            {data.map((item: any) => {
                return (
                    <CartCard
                        key={item.id}
                        salesman_img="https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg"
                        title={item.title}
                        description={sliceText(item.description)}
                        price={item.price}
                        old_price={item.old_price}
                        average_rating={item.average_rating}
                        review_count={item.review_count}
                        product_images={item.product_images}
                        product_code={Number(item.product_code)}
                        quantity={1}
                        id={item.id}
                    />
                );
            })}
        </div>
    );
};

export default ProductList;

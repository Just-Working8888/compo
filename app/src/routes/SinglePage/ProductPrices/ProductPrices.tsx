import { FC, useEffect, useState, } from "react";
import classes from './ProductPrices.module.scss'
import { useAppDispatch, useAppSelector } from "store/hook";
import { Button, Flex, Switch } from "antd";
import { HeartOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { MainBtn } from "Components";
import { fetchCartItems, putCartItems } from "store/reducers/cartReduser";
import { fetchItems } from "store/reducers/producRedusers";
import axios from "axios";
import { useParams } from "react-router-dom";


const ProductPrices: FC = () => {
    const { singleProduct } = useAppSelector((state) => state.product)
    const cart = useAppSelector((state) => state.cart.data)
    const existingCartItem = cart.find(item => item.id === singleProduct?.id);
    const [quantity, setQuantity] = useState(1)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchCartItems({ cancelToken: source.token }))
        dispatch(fetchItems({ cancelToken: source.token }))
    }, [])
    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (existingCartItem && singleProduct) {
                dispatch(putCartItems({ id: existingCartItem.id, body: { ...singleProduct, quantity: quantity } }))
            }
        }, 500)
        return () => {
            clearTimeout(timeout)
        };
    }, [quantity])

    useEffect(() => {
        existingCartItem && setQuantity(existingCartItem.quantity)
    }, [existingCartItem])

    async function addtocart() {
        const source = axios.CancelToken.source();
        const existingCartItem = cart.find(item => item.id === singleProduct?.id);
        if (!existingCartItem) {
            try {
                await axios.post('http://localhost:3001/cart', { ...singleProduct, quantity: 1 });
                dispatch(fetchCartItems({ cancelToken: source.token }))
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
    }
    return (
        <div className={classes.ProductPrices}>
            <h4>{singleProduct?.old_price} цена без скидки</h4>
            <h3>{singleProduct?.price}₽</h3>
            <div className={classes.ProductPrices_q}>
                <b>12 штук в уп.</b>
                <label htmlFor="">
                    <Switch defaultChecked />
                    _Заказ упаковкой
                </label>
            </div>
            <div className={classes.ProductPrices_main}>
                <div>
                    <h2>Завтра</h2>
                    <h3>Доставка</h3>
                </div>
                <div>
                    <h2>7 шт.</h2>
                    <h3>Тарасовка</h3>
                </div>
                <div>
                    <h2>7 шт.</h2>
                    <h3>Тарасовка</h3>
                </div>
            </div>
            <div className={classes.ProductPrices_btns}>

                {
                    !existingCartItem ? <Button onClick={addtocart} style={{ width: '100%' }} className='menuButton' type="primary" icon={<ShoppingCartOutlined />}>В корзину</Button>
                        : <Button className={classes.counter} style={{ width: '100%' }} >
                            <Flex justify="space-between">

                                <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
                                    <MinusOutlined />
                                </button>
                                <b>
                                    {quantity}
                                    <span>     штуки</span>
                                </b>

                                <button onClick={() => setQuantity(quantity + 1)}>
                                    <PlusOutlined />
                                </button>
                            </Flex>
                        </Button>
                }

                <MainBtn title="" icon={<HeartOutlined />} />
            </div>
        </div >
    );
};

export default ProductPrices;

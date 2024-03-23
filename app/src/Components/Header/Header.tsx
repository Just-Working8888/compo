// Header.tsx
import React, { useEffect, useState } from 'react';
import classes from './Header.module.scss'
import logo from '../../assets/icon/logo.svg'
import { Avatar, Button, Input, Tooltip } from 'antd';
import { BellOutlined, CloseOutlined, DownOutlined, HeartOutlined, InfoCircleOutlined, MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import MainBtn from 'Components/MainBtn/MainBtn';
import navItems from '../../data/test/headeritems.json'

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchCartItems } from 'store/reducers/cartReduser';
import axios from 'axios';
import { Product } from 'types/types';


const HeaderComponent: React.FC = () => {
    const { data } = useAppSelector((state) => state.cart)
    const [cart, setCart] = useState(0)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchCartItems({ cancelToken: source.token }))
    }, [])


    return (

        <header className={classes.header}>
            <nav className={classes.header_nav}>
                <div className={classes.header_nav_logo}>
                    <Link to={'/'}>
                        <img src={logo} alt="" />
                    </Link>

                </div>

                <Button className='menuButton' type="primary" icon={<MenuOutlined />}>
                    Меню
                </Button>
                <Input
                    className='maininput'
                    placeholder="Enter your username"
                    suffix={
                        <div>
                            <CloseOutlined style={{ fontSize: '20px', marginRight: '12px' }} />
                            <SearchOutlined style={{ fontSize: '20px', }} />
                        </div>
                    }
                />
                <div className={classes.header_nav_not}>
                    <BellOutlined />
                    <HeartOutlined />
                </div>
                <div>
                    <Link to={'/cart'}>
                        <MainBtn title={`${data.reduce((total: number, item: Product) => total + (item.price * item.quantity), 0)}$`} icon={<ShoppingCartOutlined />} />
                    </Link>
                </div>
                <div className={classes.header_nav_user}>
                    <Avatar shape="square" size={32} icon={<UserOutlined />} />
                    Ермаков Е.
                    <DownOutlined />
                </div>

            </nav>
            <nav className={classes.header_bot}>
                <div className={classes.header_bot_ul}>
                    {
                        navItems.map((item, index) => <Link key={index} to={item.href}>{item.title}</Link>)
                    }
                </div>
                <div className={classes.header_bot_nav}>
                    <MainBtn size={32} title='Ваш менеджер' icon={<WechatOutlined />} />
                    <h1>%</h1>
                    <h1>Акции</h1>
                    <h1>Блог</h1>
                </div>
            </nav>

        </header >

    );
};

export default HeaderComponent;

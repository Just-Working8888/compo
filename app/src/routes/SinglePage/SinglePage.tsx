import { FC, useEffect } from "react";
import classes from './Singlepage.module.scss'
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import axios from "axios";
import { fetchProductById } from "store/reducers/producRedusers";
import { Bredcrumps } from "Components";
import ProductImages from "./ProductImages/ProductImages";
import ProductPrices from "./ProductPrices/ProductPrices";
import { Flex } from "antd";
import ProductAtributes from "./ProductAtributes/ProductAtributes";
const bredcrumps = [
    { title: 'Каталог', href: '#' },
    { title: 'Обувь', href: '#' },
    { title: 'Кроссовки', href: '#' },
    { title: 'Беговые', href: '#' }
]


const SinglePage: FC = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { singleProduct } = useAppSelector((state) => state.product)
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchProductById({ id: Number(id), cancelToken: source.token }))
    }, [id])
    console.log(singleProduct);

    return (
        <div className={classes.main}>
            <Bredcrumps data={bredcrumps} />
            <br />
            <h1 className={classes.main_title}>{singleProduct?.title}</h1>
            <Flex gap={48}>
                <ProductImages />
                <div>
                    <Flex gap={48}>
                        <ProductPrices />
                        <div className={classes.line}></div>
                        <ProductAtributes />
                    </Flex>
                    <div className={classes.main_description}>
                        <h1>Описание товара</h1>
                        <p>{singleProduct?.description}</p>
                    </div>
                </div>

            </Flex>



        </div >
    );
};

export default SinglePage;

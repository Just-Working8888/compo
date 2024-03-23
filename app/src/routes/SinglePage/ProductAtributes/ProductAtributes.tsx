import { FC, } from "react";
import classes from './ProductAtributes.module.scss'
import { useAppSelector } from "store/hook";


const ProductAtributes: FC = () => {

    const { singleProduct } = useAppSelector((state) => state.product)
    return (
        <div className={classes.ProductAtributes}>
            <h1>Характеристики</h1>
            <div className={classes.ProductAtributes_container}>
                {
                    singleProduct?.product_attributes.map((item, index) =>
                        <div key={index}>
                            <h1>{item.value}</h1>
                            <h2>{item.key}</h2>
                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default ProductAtributes;

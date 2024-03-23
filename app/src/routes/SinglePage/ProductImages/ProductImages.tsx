import { LeftOutlined, RightOutlined, } from "@ant-design/icons";
import { Carousel, Image } from "antd";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "store/hook";
import classes from './SinglePage.module.scss';
import { MainBtn } from "Components";


const ProductImages: FC = () => {
    const { singleProduct } = useAppSelector((state) => state.product)
    const imagesList = singleProduct?.product_images
    const images: any = []
    const [count, setCount] = useState<number | undefined>(1)
    singleProduct?.product_images.forEach((item) => {
        images.push(item.image)
    })
    const [selectedImage, setSeletedImage] = useState<any>();
    useEffect(() => {
        setSeletedImage(singleProduct?.product_images[0])
    }, [singleProduct])
    useEffect(() => {
        if (imagesList !== undefined && imagesList?.length < 3) {
            setCount(imagesList?.length - 1)
        } else if (imagesList !== undefined) {
            setCount(3)
        }
    }, [imagesList])
    console.log(imagesList);

    return (
        <div className={classes.container}>
            <div className={classes.top_descr_block}>
                <div className={classes.top_descr_block_col}>
                    <div className={classes.top_descr_block_image}>
                        <Image.PreviewGroup
                            items={images}
                        >
                            <Image
                                src={selectedImage?.image}

                            />
                        </Image.PreviewGroup>
                    </div>
                    <div className="custom-swiper">
                        <div className={classes.top_descr_block_images_carousel}>

                            <Carousel
                                slidesToShow={count}
                                dots={false}
                                prevArrow={
                                    <div className="slick-prev slick-arrow">
                                        <MainBtn title="" icon={<LeftOutlined />} size={84} />
                                    </div>
                                }
                                nextArrow={
                                    <div className="slick-next slick-arrow">
                                        <MainBtn title="" icon={<RightOutlined />} size={84} />
                                    </div>}
                                slidesToScroll={1}
                                infinite={false}
                                arrows={true}
                            >
                                {
                                    imagesList?.map(item => {
                                        return <div
                                            className={
                                                selectedImage === item
                                                    ? `${classes.top_descr_block_images_carousel_item} ${classes.top_descr_block_images_carousel_item_active}`
                                                    : classes.top_descr_block_images_carousel_item
                                            }

                                            onClick={() => {
                                                setSeletedImage(item)
                                            }}
                                        >
                                            <img src={item.image} alt="" />
                                        </div>
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>

                </div>


            </div>
        </div >
    )
        ;
}

export default ProductImages;




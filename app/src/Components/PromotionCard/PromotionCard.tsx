import { useRef } from "react";
import classes from "./PromotionCard.module.scss";
import { IPromotionCard } from "interfaces";
import { Row, Col, Typography, Button, Carousel, message } from "antd";
import messageIcon from "../../assets/icon/message.svg";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { useNavigate } from "react-router-dom";
import { getCookie } from "helpers/cookies";
import { useAppDispatch, useAppSelector } from "store/hook";
import { getDiscount } from "helpers/getDiscount";
import numberWithSpaces from "helpers/numberWithSpaces";
import axios from "axios";
import { fetchCartItems } from "store/reducers/cartReduser";

const PromotionCard: React.FC<IPromotionCard> = (props) => {
  const {
    salesman_img,
    title,
    description,
    price,
    old_price,
    average_rating,
    review_count,
    product_images,
    id,
  } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Title, Text } = Typography;
  const carouselRef = useRef<CarouselRef>(null);
  const accessToken = getCookie("access_token");

  const imgHover = (index: number) => {
    carouselRef.current?.goTo(index, true);
  };

  const cart = useAppSelector((state) => state.cart.data)
  async function addtocart() {
    const source = axios.CancelToken.source();
    const existingCartItem = cart.find(item => item.id === props?.id);
    if (!existingCartItem) {
      try {
        await axios.post('http://localhost:3001/cart', { ...props, quantity: 1 });
        dispatch(fetchCartItems({ cancelToken: source.token }))
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  }

  return (
    <div className={classes.promotionCard}>
      <div className={classes.img_block}>
        <div className={classes.discount_block}>{`${getDiscount(old_price, price)}%`}</div>
        <div className={classes.img_block_hover}>
          {product_images.map((item, index) => {
            return (
              <div
                className={classes.img_block_hover_it}
                onMouseMove={() => imgHover(index)}
                key={item.id}
              ></div>
            );
          })}
        </div>
        <Carousel dotPosition={'top'} ref={carouselRef}>
          {product_images.map((item, index) => {
            return (
              <div className={classes.img_block_item} key={index}>
                <img src={item.image} alt={title} />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className={classes.salesman}>
        <Row gutter={0} align={"middle"}>
          <Col span={2}>
            <img
              src={salesman_img}
              className={classes.salesman_img}
              alt={title}
            />
          </Col>
          <Col span={2}>Продавец</Col>
        </Row>
      </div>
      <Title onClick={() => navigate(`/product/${id}`)} level={3}>{title.slice(0, 40)}{title.length > 40 ? '...' : ''}</Title>
      <div className={classes.subtitle}>
        <Text>{description}</Text>
      </div>
      <Text strong>
        <Title level={3}>{numberWithSpaces(price)} с</Title>
      </Text>
      <Row className={classes.old_price_wrap}>
        <Col span={12}>
          <span className={classes.old_price}>
            {numberWithSpaces(old_price)}
          </span>
        </Col>
        <Col span={12} className={classes.old_price_item}>
          <span>
            <StarFilled style={{ color: "#F5C423" }} />
            {average_rating}
          </span>
          <span>
            <img src={messageIcon} alt="message" />
            {numberWithSpaces(review_count)} отзыва
          </span>
        </Col>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <Button onClick={addtocart} className={classes.cart_button}>Добавить в корзину</Button>
        <Button
          className={classes.cart_favorites}

        >
          <HeartOutlined />
        </Button>
      </Row>
    </div>
  );
};

export default PromotionCard;

import { Promotion } from "Components";
import classes from "./MainPage.module.scss";
import { FC, useEffect } from "react";
import { api } from "api";
import { useAppDispatch } from "store/hook";
import axios from "axios";
import { fetchCartItems } from "store/reducers/cartReduser";


const MainPage: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(fetchCartItems({ cancelToken: source.token }))
  }, [])
  return (
    <div className={classes.main}>
      <Promotion getCarts={api.getProducts} />
    </div >
  );
};

export default MainPage;

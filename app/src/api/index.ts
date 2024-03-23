import axios from 'axios';
import auth from './auth';
import product from './product'
import cart from './cart'

const instance = axios.create({
  // @ts-ignore
  baseURL: window.REACT_APP_SERVER_API !== 'REPLACE_REACT_APP_SERVER_API' ? window.REACT_APP_SERVER_API : process.env.REACT_APP_SERVER_API || 'http://localhost:3001/',
  // headers: {
  //   Authorization: `Bearer ${getCookie('access_token')}`
  // }


})
//@ts-ignore
console.log(process.env.REACT_APP_SERVER_API, window.REACT_APP_SERVER_API);


// instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const kc_access = getCookie('kc-access') || 'test_token';
//   if (kc_access) config.headers!['kc-access'] = kc_access;
//   return config
// });

const { login, register } = auth
const { getProducts, getProductsById } = product
const { getCartItems, deleteCartItems, putCartItems } = cart


const api = {
  login,
  register,
  getProducts,
  getProductsById,
  getCartItems,
  deleteCartItems,
  putCartItems
}

export { instance, api };


import React from 'react';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ru_RU from 'antd/es/locale/ru_RU'
import colors from './scss/variables/colors.module.scss';
import { Provider } from 'react-redux';
import store from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>

    <BrowserRouter>
      <ConfigProvider locale={ru_RU} theme={{
        token: {
          colorPrimary: colors.primary50,
          colorPrimaryHover: colors.primary100,
          colorBgLayout: colors.white,
          // colorBorder: colors.primaryborder,
          // colorText: colors.primarytext,
          // colorBgTextActive: colors.lightgrayfill,
          // colorBgTextHover: colors.lightgrayfill,
          // colorFillAlter: colors.lightgrayfill,
          // colorBgElevated: colors.lightgrayfill,
        },
      }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>

  </Provider>
  // </React.StrictMode>
);

import { Route, Routes } from 'react-router-dom';
import Main from 'routes/Main/Main';
import './scss/app.scss';

import { Login, SignUp } from 'Components';
import MainPage from 'routes/MainPage/MainPage';
import SinglePage from 'routes/SinglePage/SinglePage';
import Cart from 'routes/Cart/Cart';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/' element={<Main />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/product/:id' element={<SinglePage />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
      <Route path='*' element={<main className={'errorPage'}><p>Неверный адрес</p></main>} />
    </Routes>
  );
}


export default App;
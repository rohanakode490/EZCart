import { useEffect } from 'react'
import './App.css'
import Header from './components/layout/Header/Header'
import WebFont from 'webfontloader'
import Footer from './components/layout/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LogInSignUp from './components/User/LogInSignUp';
import store from './store'
import { loadUser } from './actions/userActions';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    //load the fonts first
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
  }, []);

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path='/account' element={
          <ProtectedRoute >
            <Profile />
          </ProtectedRoute>
        } />
        <Route exact path='/me/update' element={
          <ProtectedRoute >
            <UpdateProfile />
          </ProtectedRoute>
        } />
        <Route exact path='/password/update' element={
          <ProtectedRoute >
            <UpdatePassword />
          </ProtectedRoute>
        } />
        <Route exact path="/login" element={<LogInSignUp />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
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
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/newProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  // get the stripe API key
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    //load the fonts first
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())

    getStripeApiKey()
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

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/login" element={<LogInSignUp />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route exact path='/shipping' element={
          <ProtectedRoute >
            <Shipping />
          </ProtectedRoute>
        } />

        <Route exact path='/order/confirm' element={
          <ProtectedRoute >
            <ConfirmOrder />
          </ProtectedRoute>
        } />

        {stripeApiKey && (
          <Route exact path='/process/payment' element={
            <ProtectedRoute >
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          } />
        )}

        <Route exact path='/success' element={
          <ProtectedRoute >
            <OrderSuccess />
          </ProtectedRoute>
        } />

        <Route exact path='/orders' element={
          <ProtectedRoute >
            <MyOrders />
          </ProtectedRoute>
        } />

        <Route exact path='/order/:id' element={
          <ProtectedRoute >
            <OrderDetails />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/dashboard' element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/products' element={
          <ProtectedRoute isAdmin={true}>
            <ProductList />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/product' element={
          <ProtectedRoute isAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/product/:id' element={
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/orders' element={
          <ProtectedRoute isAdmin={true}>
            <OrderList />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/order/:id' element={
          <ProtectedRoute isAdmin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/users' element={
          <ProtectedRoute isAdmin={true}>
            <UsersList />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/user/:id' element={
          <ProtectedRoute isAdmin={true}>
            <UpdateUser />
          </ProtectedRoute>
        } />

        <Route exact path='/admin/reviews' element={
          <ProtectedRoute isAdmin={true}>
            <ProductReviews />
          </ProtectedRoute>
        } />

      </Routes>
      <Footer />
    </>
  )
}

export default App

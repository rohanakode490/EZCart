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

function App() {
  useEffect(() => {
    //load the fonts first
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LogInSignUp />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

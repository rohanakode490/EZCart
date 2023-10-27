import React from 'react'
import { CgMouse } from 'react-icons/cg'
import { Product } from './Product.jsx'
import './Home.css'


// temporary product 
const product = {
    name: "Mobile",
    price: "3000",
    _id: "sample",
    images: [{ url: "https://m.media-amazon.com/images/I/61A+wkddftL._AC_SY300_SX300_.jpg" }]
}

const Home = () => {
    return (
        <>
            <div className="banner">
                <p>Welcome to EZCart</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container" className=''>
                    <button >Scroll <CgMouse /></button>
                </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </>
    )
}

export default Home
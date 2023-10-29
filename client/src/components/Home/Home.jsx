import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import { Product } from './Product.jsx'
import './Home.css'
import MetaData from '../layout/MetaData.jsx'
import { getProduct } from '../../actions/productAction.jsx'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader.jsx'
import { useAlert } from 'react-alert'


const Home = () => {

    // react-alert
    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            return alert.error(error)
        }
        dispatch(getProduct())
    }, [dispatch, error])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="EZCart - Shop whatever out want" />
                    <div className="banner">
                        <p>Welcome to EZCart</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container" className=''>
                            <button >Scroll <CgMouse /></button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </>
            }
        </>
    )
}

export default Home
import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import ProductCard from './ProductCard.jsx'
import './Home.css'
import MetaData from '../layout/MetaData.jsx'
import { clearErrors, getProduct } from '../../actions/productAction.jsx'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader.jsx'
import { useAlert } from 'react-alert'


const Home = () => {

    // react-alert
    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])

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
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </>
            }
        </>
    )
}

export default Home
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Products.css'

const Products = () => {

    const dispatch = useDispatch();

    const { products, loading, error, productsCount } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProduct())

    }, [dispatch])


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h2 className="productsHeading">Products</h2>

                    {/* Load the products */}
                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                </Fragment>
            )}
        </>
    )
}

export default Products
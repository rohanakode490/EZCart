import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Products.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography';

const Products = () => {
    const dispatch = useDispatch();

    // product keyword to search
    const { keyword } = useParams()

    // for pagination
    const [currentPage, setCurrentPage] = useState(1)
    // for filters
    const [price, setPrice] = useState([0, 25000])

    // from the redux-reducer
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    // for pagination
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    // for filters
    const priceHandler = (event, newprice) => {
        setPrice(newprice)
    }

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price))

    }, [dispatch, keyword, currentPage, price])

    let count = filteredProductsCount;

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

                    {/* Filtering Options */}
                    <div className="filterBox">
                        {/* price */}
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />
                    </div>

                    {/* when we have less products than the limit to show on 1 page */}
                    {resultPerPage < count && (
                        // Pagination 
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}

                </Fragment >
            )}
        </>
    )
}

export default Products
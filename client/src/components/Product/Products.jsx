import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Products.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'

const Products = () => {
    const dispatch = useDispatch();

    // product keyword to search
    const { keyword } = useParams()

    // for pagination
    const [currentPage, setCurrentPage] = useState(1)

    // from the redux-reducer
    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products)

    console.log(productsCount)

    // for pagination
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage))

    }, [dispatch, keyword, currentPage])


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

                    {/* when we have less products than the limit to show on 1 page */}
                    {resultPerPage < productsCount && (
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
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Products.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider'
import {useAlert} from 'react-alert'
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData'

// categories
const categories = [
    "Laptop", "SmartPhones", "Camera", "Tops", "Bottoms", "Attire", "Footwear"
]

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    // product keyword to search
    const { keyword } = useParams()

    // for pagination
    const [currentPage, setCurrentPage] = useState(1)
    // for filters
    const [price, setPrice] = useState([0, 25000])
    // for categories
    const [category, setCategory] = useState('')
    // for rating
    const [ratings, setRatings] = useState(0)

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
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings, alert, error))

    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

    let count = filteredProductsCount;

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData  title="PRODUCTS -- EZCART"/>
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


                        {/* Categories */}
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        {/* Rating */}
                        <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating)=>{
                                setRatings(newRating)
                            }}
                            valueLabelDisplay='auto'
                            aria-labelledby='continuous-slider'
                            min={0}
                            max={5}
                        />
                        </fieldset>
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
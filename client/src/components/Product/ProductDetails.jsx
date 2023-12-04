import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.jsx'
import Loader from '../layout/Loader/Loader'
import { useAlert } from "react-alert"
import MetaData from '../layout/MetaData.jsx'
import { addItemsToCart } from '../../actions/cartAction.jsx'

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert()
    const params = useParams();

    const { product, error, loading } = useSelector((state) => state.productDetails)

    // number of products to add to cart / buy
    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            return;
        }
        setQuantity(prev => prev + 1);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(prev => prev - 1);
    }

    // add items to cart
    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity))
        alert.success("Item added to cart")
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert])

    // React rating options
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- EZCART`} />
                    <div className="ProductDetails">
                        {/* image carousel */}
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, index) => (
                                        <img src={item.url} key={index} alt={`${index} Slide`} className="CarouselImage" />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product $ {product._id}</p>
                            </div>

                            {/* Reviews  */}
                            <div className="detailsBlock-2">
                                <ReactStars {...options} value={product.ratings} />
                                <span>({product.numberOfReviews} Reviews)</span>
                            </div>

                            {/* Price*/}
                            <div className="detailsBlock-3">
                                <h1>{`\u20B9 ${product.price}`}</h1>
                                {/* Cart */}
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button onClick={addToCartHandler}>Add to Cart</button>
                                </div>

                                <p>
                                    Status:{" "}
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>

                            <button className='submitReview'>Submit Review</button>
                        </div>
                    </div>

                    {/* Showing the first review */}
                    <h3 className='reviewsHeading'>REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            ))}
                        </div>
                    ) :
                        <p className='noReviews'>No Reviews Yet</p>
                    }
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
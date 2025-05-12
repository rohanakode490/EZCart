import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard.jsx'
import Loader from '../layout/Loader/Loader'
import { useAlert } from "react-alert"
import MetaData from '../layout/MetaData.jsx'
import { addItemsToCart } from '../../actions/cartAction.jsx'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button'
import { NEW_REVIEW_RESET } from '../../constants/productConstants.jsx'


const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert()
    const params = useParams();

    const { product, error, loading } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview);


    // number of products to add to cart / buy
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

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

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success])

    const submitReviewToggle = () => {
        console.log("here")
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        // create review
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);

        // send review to backend
        dispatch(newReview(myForm));

        setOpen(false); // close submit Dialog box after clicking on submit
    }

    // React Rating options
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
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
                                {/* <p>Product ₹{product.price}</p> */}
                            </div>

                            {/* Reviews  */}
                            <div className="detailsBlock-2">
                                <Rating {...options} value={product.ratings} />
                                <span className='detailsBlock-2-span'>({product.numberOfReviews} Reviews)</span>
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
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>

                                <p>
                                    Status:{" "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    {/* Submit Review */}
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Showing the first review */}
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
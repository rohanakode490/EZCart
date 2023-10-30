import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, error, loading } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    
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
        <>
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
                        <ReactStars {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>

                    {/* Price*/}
                    <div className="detailsBlock-3">
                        <h1>{`\u20B9 ${product.price}`}</h1>
                        {/* Cart */}
                        <div className='detailsBlock-3-1'>
                            <div className='detailsBlock-3-1-1'>
                                <button>-</button>
                                <input type="number" value="1" />
                                <button>+</button>
                            </div>{" "}
                            <button>Add to Cart</button>
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
        </>
    )
}

export default ProductDetails
import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'

const ProductDetails = () => { 

    const {id}=useParams();
    const dispatch = useDispatch();

    const { product, error, loading } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    return (
        <>
            <div className="ProductDetails">
                {/* image carousel */}
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, index) => (
                                <img src={item.url} key={item.url} alt={`${index} Slide`} className="CarouselImage" />
                            ))

                        }
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
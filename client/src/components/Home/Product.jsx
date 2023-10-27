import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'


export const Product = ({ product }) => {

  // react rating options
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
  }

  return (
    <Link className='productCard' to={product._id}>
      {/* Product image */}
      <img src={product.images[0].url} alt={product.name} />

      <p className="">{product.name}</p>
      <div className="">
        <ReactStars {...options} /> <span> ({product.numberOfReviews} Reviews) </span>
      </div>
      <span>{`\u20B9 ${product.price}`}</span>
    </Link>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'


const options = {
  edit: false,
  color: "rgba(20, 20, 20, 0.1)",
  activeColor: "tomato",
  size: window.innerWidth < 600 ? 20 : 25,
  value: 2.5,
  isHalf: true
}

export const Product = ({ product }) => {
  return (
    <Link className='productCard' to={product._id}>
      {/* Product image */}
      <img src={product.images[0].url} alt={product.name} />

      <p className="">{product.name}</p>
      <div className="">
        <ReactStars {...options} /> <span> (55 Reviews) </span>
      </div>
      <span>{product.price}</span>
    </Link>
  )
}

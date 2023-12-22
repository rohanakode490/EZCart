import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {
  // react rating options
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      {/* Product image */}
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`\u20B9 ${product.price}`}</span>
    </Link>
  )
}

export default ProductCard
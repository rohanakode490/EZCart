import React from 'react'
import './CartItemCard.css'
import { Link } from 'react-router-dom'

const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt="temp" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: \u20B9${item.price}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    )
}

export default CartItemCard
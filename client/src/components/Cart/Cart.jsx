import React from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // from redux state
    const { cartItems } = useSelector(state => state.cart)

    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;

        if (stock <= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQuantity))
    }

    const decreaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity - 1;

        if (1 >= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQuantity))
    }

    // dispatch remove cart items
    const deleteCartItemsa = (id) => {
        dispatch(removeItemsFromCart(id))
    }

    // check out Order
    const checkoutHandler = () => {
        navigate("/login?redirect=shipping")
    }

    return (
        <>
            {
                cartItems.length === 0 ? (
                    <div className="emptyCart">
                        <MdRemoveShoppingCart />
                        <Typography> No Product in your Cart</Typography>

                        <Link to="/products">View Products</Link>
                    </div>
                ) : <>
                    <div className="cartPage">
                        {/* Header */}
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map((item) => (
                            <div key={item.product} className="cartContainer">
                                {/* List of items */}
                                <CartItemCard item={item} deleteCartItems={deleteCartItemsa} />
                                <div className="cartInput">
                                    <button onClick={() =>
                                        decreaseQuantity(item.product, item.quantity, item.stock)
                                    }> - </button>

                                    <input readOnly type="number" value={item.quantity} />

                                    <button onClick={() =>
                                        increaseQuantity(item.product, item.quantity)
                                    }> + </button>
                                </div>
                                {/* Subtotal of cart items */}
                                <p className="cartSubtotal">{`\u20B9${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        {/* Total */}
                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`\u20B9${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Cart
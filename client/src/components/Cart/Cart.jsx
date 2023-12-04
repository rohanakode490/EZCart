import React from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart } from '../../actions/cartAction'

const Cart = () => {
    const dispatch = useDispatch();

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

    return (
        <>
            <div className="cartPage">
                {/* Header */}
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                {cartItems && cartItems.map((item) => (
                    <div className="cartContainer">
                        {/* List of items */}
                        <CartItemCard item={item} />
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
                        <p>{`\u20B9200`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
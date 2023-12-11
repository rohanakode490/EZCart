import './Payment.css'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import Typography from '@mui/material/Typography'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { MdCreditCard, MdEvent, MdVpnKey } from "react-icons/md";
import { useRef } from 'react'
import axios from 'axios'


const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const dipatch = useDispatch()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null)
    const navigate = useNavigate()

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    // const { error } = useSelector(state => state.newOrder)

    // PAYMENT DATA
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice*100) //Ruppees to Paise
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            // Send Details
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config);

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    // order to be placed

                    navigate("/success")
                } else {
                    alert.error("There's some issue while processing payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false
            alert.error(error.response.data.message)
        }
    }

    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <MdCreditCard />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <MdEvent />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - \u20B9${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}

export default Payment
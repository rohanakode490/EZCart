import React from 'react'
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

const StripeContainer = ({ stripeApiKey }) => {
    return (
        <>
            <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
            </Elements>
        </>
    )
}

export default StripeContainer
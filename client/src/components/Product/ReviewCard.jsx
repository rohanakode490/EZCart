import React from 'react'
import Rating from '@mui/material/Rating';
import { ProfilePng } from '../../assets'

const ReviewCard = ({ review }) => {

    // React rating options
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className='reviewCard'>
            <img src={ProfilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    )
}

export default ReviewCard
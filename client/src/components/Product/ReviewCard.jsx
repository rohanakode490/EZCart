import React from 'react'
import ReactStars from 'react-rating-stars-component'
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
            <img src={ProfilePng} alt="Profile" />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    )
}

export default ReviewCard
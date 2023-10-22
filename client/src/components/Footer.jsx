import React from 'react'
import { appstore, playstore } from '../assets/index.js'

const Footer = () => {
    return (
        <footer className='mt-32 p-10 bg-[rgb(34,33,33)] text-white flex items-center'>
            {/* left footer */}
            <div className="">
                <h4 className="Download Our APP"></h4>
                <p>Download APP for Android and IOS mobile</p>
                <img src={appstore} alt="appstore" />
                <img src={playstore} alt="playstore" />
            </div>

            {/* mid footer */}
            <div className="">
                <h1>EZCart</h1>
                <p>High Quality is our first Priority</p>
                <p>Copywrites 2021 &copy; RohanAkode</p>
            </div>

            {/* right footer */}
            <div className="">
                <h4>Follow Us</h4>
                <a href="">Instagram</a>
                <a href="">Youtube</a>
                <a href="">Twitter</a>
            </div>

        </footer>
    )
}

export default Footer
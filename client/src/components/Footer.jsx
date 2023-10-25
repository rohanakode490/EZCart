import React from 'react'
import { appstore, playstore } from '../assets/index.js'

const Footer = () => {
    return (
        <footer className='mt-32 p-10 bg-[rgb(34,33,33)] text-white flex items-center'>
            {/* left footer */}
            <div className="w-[20%] flex flex-col items-center">
                <h4 className="font-bold text-lg underline underline-offset-1">Download Our APP</h4>
                <p className='text-center m-4'>Download APP for Android and IOS mobile</p>
                <img className='w-36 m-4 cursor-pointer' src={appstore} alt="appstore" />
                <img className='w-36 m-4 cursor-pointer' src={playstore} alt="playstore" />
            </div>

            {/* mid footer */}
            <div className="w-[60%] text-center">
                <h1 className='text-5xl font-bold text-primary'>EZCart</h1>
                <p className='w-[60%] mt-10 mx-auto font-gill'>High Quality is our first Priority</p>
                <p className='w-[60%] mx-auto font-gill'>Copywrites 2021 &copy; RohanAkode</p>
            </div>

            {/* right footer */}
            <div className="w-[20%] flex flex-col items-center">
                <h4 className='text-2xl font-bold underline underline-offset-1 mb-2'>Follow Us</h4>
                <a className='text-lg m-1' href="">Instagram</a>
                <a className='text-lg m-1' href="">Youtube</a>
                <a className='text-lg m-1' href="">Twitter</a>
            </div>

        </footer>
    )
}

export default Footer
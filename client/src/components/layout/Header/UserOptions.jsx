import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { MdDashboard, MdShoppingCart } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { logout } from '../../../actions/userActions';
import { useDispatch, useSelector } from "react-redux"
import Backdrop from '@mui/material/Backdrop';
import './Header.css'

const UserOptions = ({ user }) => {
    const navigate = useNavigate()
    const alert = useAlert();
    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart)

    const [open, setOpen] = useState(false)

    const options = [
        { icon: <FaTableList />, name: "Orders", func: orders },
        { icon: <IoMdPerson />, name: "Profile", func: account },
        { 
            icon: <MdShoppingCart style={{ color: cartItems.length > 0 ? "#eb4034" : "unset" }} />,
            name: `Cart(${cartItems.length})`, 
            func: cart
        },
        { icon: <IoMdExit />, name: "Logout", func: logoutUser },
    ]

    // when the user is admin then can redirect to the dashoboard
    if (user !== undefined) {
        if (user.role === 'admin') {
            options.unshift({ icon: <MdDashboard />, name: "Dashboard", func: dashboard })
        }
    }
    function dashboard() {
        navigate('/admin/dashboard')
    }

    // orders function 
    function orders() {
        navigate('/orders')
    }

    // account function 
    function account() {
        navigate('/account')
    }

    // cart function 
    function cart() {
        navigate('/cart')
    }

    // logoutUser function 
    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successful")
    }


    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction='down'
                className='speedDial'
                icon={<img
                    className='speedDialIcon'
                    src={(user !== true && user !== undefined) ? user.avatar.url : '/Profile.png'}
                    alt='Profile'
                />}
            >

                {options.map((item) => (

                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions
import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { MdDashboard } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { logout } from '../../../actions/userActions';
import { useDispatch } from "react-redux"
import Backdrop from '@mui/material/Backdrop';
import './Header.css'

const UserOptions = ({ user }) => {
    const navigate = useNavigate()
    const alert = useAlert();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)

    const options = [
        { icon: <FaTableList />, name: "Orders", func: orders },
        { icon: <IoMdPerson />, name: "Profile", func: account },
        { icon: <IoMdExit />, name: "Logout", func: logoutUser },
    ]

    // when the user is admin then can redirect to the dashoboard
    if (user !== undefined) {
        if (user.role === 'admin') {
            options.unshift({ icon: <MdDashboard />, name: "Dashboard", func: dashboard })
        }
    }

    function dashboard() {
        navigate('/dashboard')
    }

    // orders function 
    function orders() {
        navigate('/orders')
    }

    // account function 
    function account() {
        navigate('/account')
    }

    // logoutUser function 
    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successful")
    }


    return (
        <>
        <Backdrop open={open} style={{zIndex:"10"}}/>
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{zIndex:"11"}}
                open={open}
                direction='down'
                className='speedDial'
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                    alt='Profile'
                />}
            >
 
                {options.map((item) => (

                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions
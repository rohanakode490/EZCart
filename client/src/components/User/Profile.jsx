import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import './Profile.css'

const Profile = () => {

    const navigate = useNavigate()

    const { user, loading, isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }

    }, [isAuthenticated, navigate])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={user ? `${user.name}'s Profile` : `Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={(user !== true && user !== undefined) ? user.avatar.url : ""} alt={(user !== true && user !== undefined) ? user.name : ""} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{(user !== true && user !== undefined) ? user.name: ""}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{(user !== true && user !== undefined) ? user.email: ""}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{(user !== true && user !== undefined) ? String(user.createdAt).substring(0, 10) : ""}</p>
                            </div>
                            <div>
                                <Link to="/orders">My orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    )
}

export default Profile
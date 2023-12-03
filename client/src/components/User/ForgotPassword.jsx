import React, { useState, useEffect } from "react";
import './ForgotPassword.css'
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import Loader from '../layout/Loader/Loader'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";


const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { error, message, loading } = useSelector(state => state.forgotPassword)

    const [email, setEmail] = useState('')

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Update Profile" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>
                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >

                                {/* SIGNUP - email */}
                                <div className="forgotPasswordEmail">
                                    <FiMail />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* BUTTON */}
                                <input type="submit" value="Send" className="forgotPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ForgotPassword
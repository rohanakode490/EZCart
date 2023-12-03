import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader'
import './ResetPassword.css'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { MdOutlineLockOpen, MdLock } from "react-icons/md";
import MetaData from "../layout/MetaData";


const ResetPassword = () => {
    const params_token = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { error, success, loading } = useSelector((state) => state.forgotPassword)


    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    // signup form submit
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params_token.token, myForm))
    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Profile Updated Successfully");

            navigate("/login");

        }
    }, [dispatch, error, alert, navigate, success]);


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Change Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Update Profile</h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >

                                {/* NEW Password */}
                                <div>
                                    <MdOutlineLockOpen />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <MdLock />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>


                                {/* BUTTON */}
                                <input type="submit" value="Update" className="resetPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ResetPassword
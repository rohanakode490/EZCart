import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiUser } from "react-icons/fi";
import { MdOutlineLockOpen } from "react-icons/md";
import Loader from '../layout/Loader/Loader'
import './LogInSignUp.css'

const LogInSignUp = () => {

    // references
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    // LOGIN - States
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    // SIGNUP - States
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png')

    // login form submit
    const loginSubmit = () => {
        console.log("Login Form Submitted")
    }

    // signup form submit
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        console.log("SignUp Form Submitted")
    }

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")

            loginTab.current.classList.remove("shiftToLeft")
        }
        if (tab === 'register') {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")

            loginTab.current.classList.add("shiftToLeft")
        }
    }


    return (
        <>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        {/* switch between login and signUp */}
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    {/* LOGIN FORM */}
                    <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                        {/* LOGIN - email */}
                        <div className="loginEmail">
                            <FiMail />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        {/* LOGIN - password */}
                        <div className="loginPassword">
                            <MdOutlineLockOpen />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forget Password ?</Link>
                        {/* BUTTON */}
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>

                    {/* SIGNUP FORM*/}
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        {/* SIGNUP - name */}
                        <div className="signUpName">
                            <FiUser />
                            <input
                                type="text"
                                placeholder="name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>

                        {/* SIGNUP - email */}
                        <div className="signUpEmail">
                            <FiMail />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={registerDataChange}
                            />
                        </div>
                        {/* SIGNUP - password */}
                        <div className="signUpPassword">
                            <MdOutlineLockOpen />
                            <input
                                type="password"
                                placeholder="Password"
                                name="Password"
                                required
                                value={loginPassword}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
                        </div>

                        {/* BUTTON */}
                        <input type="submit" value="Register" className="signUpBtn"/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LogInSignUp
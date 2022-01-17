
import React, { useState, useEffect } from 'react'
import { login, addUser, getProfile } from '../config/MyService'
import Footer from './Footer'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import SocialButton from './SocialButton'
import { Container, Col, Row, Form } from "react-bootstrap";

import { AiOutlineGoogle } from 'react-icons/ai'
import { ImDatabase, ImFacebook } from 'react-icons/im'
import { FaTwitter } from 'react-icons/fa'

export default function Login() {
    const [state, setState] = useState({ email: '', password: '', name: '', age: '' });
    const History = useHistory();
    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
    }
    const [info, setInfo] = useState({})


    const handleSocialLogin = (user) => {
        console.log(user);
        let data = {
            name: user._profile.firstName,
            lname: user._profile.lastName,
            mobile: user._profile.id,
            email: user._profile.email,
            //password: "socialLogin",
        };
        addUser(data).then((res) => {
            if (res.data.err) {
                alert(res.data.err);
            } else {
                alert(res.data.msg);
                // navigate("/login");
                localStorage.setItem("_token", res.data.token)
            }
        });
        localStorage.setItem("user", JSON.stringify(data));

        console.log(user)
        History.push("/Dash");
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };
    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            localStorage.removeItem('_token')
        }

    }, [])

    const postRegis = (event) => {
        event.preventDefault();
        let data = { email: state.email, password: state.password };
        console.log(data)
        login(data)
            .then(res => {
                console.log(res.data)
                console.log(res.data.msg)
                if (res.data.err) {
                    alert(res.data.err)
                }
                else {
                    // localStorage.setItem("_token", res.data.token);
                    localStorage.setItem("_token", res.data.token)
                    localStorage.setItem("user", data.email);
                    console.log(state.email)
                    alert(res.data.msg)
                    History.push("/Dash")
                    window.location.reload();

                }

            })
    }

    return (
        <div className='container-fluid' >
            <br /><br />
            <div className='container'>


                <div className="row ">

                    <br />
                    <br />
                    <div className="col-md-12 col-lg-6 col-sm-12 cen">
                        <br />
                        <br />
                        <br />
                        <br />
                        <div >

                            <SocialButton
                                provider="facebook"
                                appId="1526833221022363"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                className="btnf btn-primary btn-lg btn-block"
                            >
                                <ImFacebook size="30px" />
                                Login With Facebook
                            </SocialButton>
                            <br />
                            <br /> <br />

                            <SocialButton
                                provider="google"
                                appId="125806190119-4kcen24avngi7namc7o6nuvat6l3lp4c.apps.googleusercontent.com"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                className="btng btn-danger btn-lg btn-block"
                            >
                                <AiOutlineGoogle size="30px" />
                                Login With Google
                            </SocialButton>
                        </div>
                        <div className="vl"></div>
                    </div>
                    <div className=" col-md-12  col-lg-6 col-sm-12 cardLogin border">
                        <div className='container'>
                            <h1 className="text-center">
                                Login to Neo<span className="text-danger">STORE</span>
                            </h1>
                            <br />
                            <br />
                            <form method="post" onSubmit={postRegis}>

                                <div className="form-group">
                                    <h5>EMAIL</h5>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        onChange={handler}
                                    />
                                </div>
                                <br />
                                <br />
                                <div className="form-group">
                                    <h5>PASSWORD</h5>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        onChange={handler}
                                    />
                                </div>
                                <br />
                                <div className="text-center">
                                    <input
                                        type="submit"
                                        value="LOGIN"
                                        className="btn btn-dark text-center"
                                    />
                                </div>
                            </form>
                            <br />
                            <br />
                            <div className="container text-center">
                                <Link to="/Reg">
                                    <span>Register </span>
                                </Link>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <Link to="/forgot">
                                    <span> Forgot Password?</span>
                                </Link>
                            </div>
                            {/* <p className="text-center">Click here to <Link to="/Register">Register</Link></p> */}
                        </div>
                    </div>
                </div>
                <br />
                <br /><br />
            </div>
            <Footer />
        </div>

    )
}


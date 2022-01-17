import React, { Component } from 'react'
import { addUser } from '../config/MyService'
import { AiOutlineGoogle } from 'react-icons/ai'
import { ImFacebook } from 'react-icons/im'
import Footer from './Footer'
import axios from 'axios'

import { Link, Redirect } from 'react-router-dom';
import SocialButton from './SocialButton'
const regForName = RegExp(/^[A-Za-z]/);
const regForEve = RegExp(/^(?!^ +$)^.+$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForMobile = RegExp(/^[0-9]{10}$/);


export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodata: [], fname: '', mobile: '', email: '', password: '', confirm_password: '', lname: '', gender: '', errors: {
                fname: '',
                mobile: '',
                email: '',
                password: '',
                confirm_password: '',
                setinfo: '',
                lname: '',
                gender: '',


            }, err: {
                fname: '',
                mobile: '',
                email: '',
                password: '',
                confirm_password: '',
                lname: '',

            }
        }
    }
    handle = (event) => {
        const { name, value } = event.target

        let errors = this.state.errors;
        let err = this.state.err;
        switch (name) {
            case 'fname':
                errors.fname = regForName.test(value) ? '' : 'Enter Valid first Name';
                if (errors.fname !== "") { err.fname = "error" }
                else { err.fname = "" }
                break;
            case 'lname':
                errors.fname = regForName.test(value) ? '' : 'Enter Valid first Name';
                if (errors.lname !== "") { err.lname = "error" }
                else { err.lname = "" }
                break;

            case 'mobile':
                errors.mobile = regForMobile.test(value) ? '' : 'Enter Username';
                if (errors.mobile !== "") { err.mobile = "error" }
                else { err.mobile = "" }
                break;
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Enter Valid Email';
                if (errors.email !== "") { err.email = "error" }
                else { err.email = "" }
                break;
            case 'password':
                errors.password = regForEve.test(value) ? '' : 'Enter Password';
                if (errors.password !== "") { err.password = "error" }
                else { err.password = "" }
                break;
            case 'confirm_password':
                errors.confirm_password = this.state.password === value ? '' : "Password and Confirm Password does not match"
                if (errors.confirm_password !== "") { err.confirm_password = "error" }
                else { err.fname = "" }
                break;

        }
        this.setState({ err, errors, [name]: value }, () => {
            console.log(errors)
        })
    }
    formSubmit = (event) => {
        event.preventDefault();


        if (this.validate(this.state.errors)) {
            if (this.state.email !== "" && this.state.password !== "" && this.state.fname !== "" && this.state.lname !== "" && this.state.username !== "") {
                //  alert("Details added successfully !!")
                this.add()
                this.props.history.push("/")
            }
            else {
                alert("Failed to Register")
            }


        }
        else {
            alert("Please Enter Valid Details");
        }
    }
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }
    add = (event) => {
        let data = {
            name: this.state.fname,
            lname: this.state.lname,
            mobile: this.state.mobile,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender


        }
        addUser(data).then((res) => {
            if (res.data.err) {
                alert(res.data.err);
            } else {
                alert(res.data.msg);
                this.props.history.push("/");
            }
        });



    }

    render() {
        const { errors } = this.state;

        const handleSocialLoginFailure = (err) => {
            console.error(err);
        };
        // const [info, setInfo] = useState({})
        const handleSocialLogin = (user) => {
            console.log(user);
            let data = {
                name: user._profile.firstName,
                mobile: user._profile.id,
                email: user._profile.email,

            };
            addUser(data).then((res) => {
                if (res.data.err) {
                    alert(res.data.err);
                } else {
                    alert(res.data.msg);
                    // navigate("/login");
                }
            });
            localStorage.setItem("user", JSON.stringify(data));
            this.props.history.push("/Dash");
        };

        return (
            <div className='container-fluid' style={{ height: "800px" }}  >
                <br /><br />
                <div className='container col-8'>
                    <div className="row container" >
                        <br /><br />
                        <br /><br />

                        <div className=' cen  col-md-12 col-lg-6 col-sm-12 cen'>
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
                        </div>
                        <div className=' container col-md-5 '>
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
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                <h1 className="text-center">
                    Register to Neo<span className="text-danger">STORE</span>
                </h1>
                {/* <h1 className=" display-4 text-center text-uppercase">Registration</h1> */}
                <div className="container   col-md-12  col-lg-8 col-sm-12  bg-light" >
                    <div className="col-lg-6 mx-auto">
                        <br />
                        <form onSubmit={this.formSubmit} method="post">
                            <label>Fisrt Name</label>
                            <input type="text" name="fname" className="form-control" onChange={this.handle} />
                            {errors.fname.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.fname}</span>}<br />
                            <label> Last Name</label>
                            <input type="text" name="lname" className="form-control" onChange={this.handle} />
                            {errors.lname.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.lname}</span>}<br />

                            <label>Mobile</label>
                            <input type="text" name="mobile" className="form-control" onChange={this.handle} />
                            {errors.mobile.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.mobile}</span>}<br />
                            <label>Email</label>
                            <input type="text" name="email" className="form-control" onChange={this.handle} />
                            {errors.email.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.email}</span>}<br />
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" onChange={this.handle} />
                            {errors.password.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.password}</span>}<br />
                            <label>Confirm Password</label>
                            <input type="password" name="confirm_password" className="form-control" onChange={this.handle} />
                            {errors.confirm_password.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.confirm_password}</span>}<br />
                            <div className="mb-3">
                                <label className="pr-2">Gender:</label>
                                <input type="radio" value="Male" name="gender" className="mt-1 pl-2" onChange={this.handle} /> Male &nbsp;
                                <input type="radio" value="Female" name="gender" className="mt-1 pl-2" onChange={this.handle} /> Female<br /><br />
                            </div><br />
                            <div className="text-center">
                                <input type="submit" value="SUMBIT" className="btn btn-dark " />
                            </div>
                            <br /><br />
                            <p className="text-center text-uppercase ">If Registered, Go to <Link to="/" style={{ "color": "black", textDecoration: "none" }} className="btn btn-outline-dark">Login Page</Link></p>

                        </form>
                    </div>

                </div><br /><br />
                <Footer />
            </div>
        )
    }
}

export default Register

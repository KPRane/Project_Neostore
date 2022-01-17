
import React from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai";

import { FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Product from './Product'
import Dashboard from './Dashboard'
import Cart from './Cart'
import MyAccount from './Myprofile/MyAccount';
import Profile from './Myprofile/Profile';
import Address from './Myprofile/Address'
import Order from './Myprofile/Order'
import ChangePasssword from "./Myprofile/ChangePassword"
import { useEffect, useState } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";

import Register from './Register';
import Login from './Login';
import Forgotpassword from './Forgotpassword';
import Otp from './Otp';
import Checkout from "./Checkout"
import ProductDetails from './ProductDetails';
import GMap from './GMap'
//import MyAccount from './Myaccount';
import Invoice from "./Invoice"


export default function NavbarDash(props) {
  const [len, setLen] = useState(0)
  let History = useHistory();
  const [temp, setTemp] = useState(1)
  const [temp2, setTemp2] = useState(1)

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    // localStorage.removeItem("user");
    History.push("/")
    setTemp(0)
    // setTemp2(0)
    // setprofile(0)
  }
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("mycart"));

    if (cartItems) {
      setLen(cartItems.length);

      console.log(cartItems.length);
    }
  }, []);

  // const logout = () => {
  //   localStorage.removeItem("_token");
  //   localStorage.removeItem("user");
  //   navigate("/");
  //};
  return (
    <div className='col-md-12 col-lg-12 col-sm-12'>


      <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: "white", backgroundColor: "black" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img src="images/22.jpeg" className="" height="50px" width="300px"></img></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0 mx-auto" style={{ marginTop: "10px" }}>
              <li class="nav-item">
                <a className="nav-link active" aria-current="page" ><Link to="/Dash" className="nav-link text-light">HOME</Link></a>
              </li>
              <li class="nav-item">
                <a className="nav-link active" aria-current="page" ><Link to="/Product" className="nav-link text-light">PRODUCT</Link></a>
              </li>
              {localStorage.getItem('user') ?
                <li class="nav-item">
                  <a className="nav-link active" aria-current="page" > <Link to="/Order" className="nav-link text-light">ORDER</Link>
                  </a>
                </li> : ""}
              <li className="nav-item navcart" >
                <a className="nav-link  mx-auto" > <Link to="/Cart" className="nav-link text-light"><AiOutlineShoppingCart size="30px" />{len} </Link> </a>
              </li>
              <li className="nav-item dropdown" style={{ width: "100px", }}>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaRegUser size="25px" style={{ marginTop: "10px" }} />
                </a>
                <ul className="dropdown-menu  mx-auto" aria-labelledby="navbarDropdown">
                  <li> <a className="dropdown-item" >
                    <Link to="/Reg" className="nav-link text-dark text-uppercase">Register</Link>
                  </a></li>
                  <li>
                    <a className="dropdown-item" >
                      <Link to="/" className="nav-link text-dark text-uppercase">Login</Link>
                    </a>
                  </li>
                  {localStorage.getItem('user') ?

                    <li className="dropdown-item">
                      <a className="nav-link text-dark " onClick={logout}>LOGOUT</a>
                    </li> : " "}
                  {localStorage.getItem('user') ?

                    <li className="dropdown-item">
                      <a className="nav-link"  >
                        <Link to="/MyAccount" className="nav-link text-dark "><CgProfile size="25px" className='text-info' />&nbsp;Profile</Link>
                      </a>
                    </li> : " "}
                </ul>
              </li>



            </ul>
            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-danger" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/Map" exact component={GMap} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/Profile" exact component={Profile} />
        <Route path="/Invoice" exact component={Invoice} />
        <Route path="/Address" exact component={Address} />
        <Route path="/Order" exact component={Order} />
        <Route path="/ChangePasssword" exact component={ChangePasssword} />
        <Route path="/Cart" exact component={Cart} />
        <Route path="/otp" exact component={Otp} />
        <Route path="/ProductDetails" exact component={ProductDetails} />
        <Route path="/otp" exact component={Otp} />
        <Route path="/MyAccount" exact component={MyAccount} />
        <Route path="/forgot" exact component={Forgotpassword} />
        <Route path="/Product" exact component={Product} />
        <Route path="/Dash" exact component={Dashboard} />
        <Route path="/Dash/cart" exact component={Cart} />

        <Route path="/Reg" exact component={Register} />
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  )
}




import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { authentication } from '../config/MyService';
import { useLocation } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export default function Checkout() {
    const history = useHistory();
    const [orders, setOrders] = useState([])
    const [cnumber, setCnumber] = useState(0);
    const [cart, setCart] = useState([]);
    const location = useLocation();
    console.log(location.state)
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });
    let items = [];
    let total = [0];
    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            authentication(localStorage.getItem("_token")).then(res => {
                if (res.data.err) {
                    // alert(res.data.msg);
                    // console.log(res.data.msg)

                }
            })
        }
        else {
            warning('Login is Required');
            history.push('/')
        }
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
        console.log(cartItems)


    }, [])

    const checkout = () => {
        // localStorage.removeItem("mycart");
        //history.push('/address')
        history.push(
            {
                pathname: '/address',
                state: { orderno: location.state.orderno }
            }
        )
    }

    const goback = () => {
        history.push("/Cart")
    }
    return (

        <>

            <div className="container"><br />

                <h2 className='display-6 text-uppercase text-center' >Check out</h2><br />
                <button className='btn btn-secondary ' onClick={goback}>Go Back</button>
                <div className='row'>
                    <div className='col-5  card3' >
                        <label>DEBIT CARD DETAILS</label>
                        <input type="number" placeholder="Enter credit card " className='form-control' name="cnumber" onChange={(e) => { setCnumber(e.target.value) }} />
                        {cnumber != '' && cnumber.length < 16 && <span className="text-danger">Enter creidt card number correctly</span>}<br />
                        <button className='btn btn-dark'
                            onClick={() => checkout()}
                        >
                            Check out
                        </button>
                    </div>&nbsp;
                    <div className='col-5 card3'>
                        {/* 
                        <h4 className='mt-4'>
                            Order total:

                        </h4> */}

                        <h4>Review Order</h4>
                        <hr />
                        <table width="300px" >

                            <tr>
                                <th>Grand Total:</th>
                                <th>{localStorage.getItem('total')}</th>
                            </tr>
                            <br />

                        </table>
                        <br />

                    </div>
                </div>
            </div>
        </>
    )
}
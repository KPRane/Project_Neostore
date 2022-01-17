import React from 'react'
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from 'react';
import { getOrderdata } from '../../config/MyService';
import MyAccount from './MyAccount';
import { useHistory } from 'react-router'
import Footer from "../Footer"
export default function Order() {
    let [temp, settemp] = useState([]);
    let [items, setitems] = useState([])

    const History = useHistory();
    useEffect(() => {
        getOrderdata(localStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    let data1 = res.data.user;
                    settemp(data1);
                    // console.log([data1])
                    // console.log(temp)
                    console.log(res.data.items)
                    // let data2 = res.data.items;
                    // setitems(data2);
                    // console.log(data2)
                    // console.log(items)


                }
                else {
                    console.log(res.data.err)
                }
            })
    }, [])
    const invoice = (orderno) => {

        History.push(
            {
                pathname: '/Invoice',
                // search: id
                state: { orderno: orderno }
            }
        )
    }
    return (
        <div>
            <div className='row card4'>

                <div className='col-lg-5 col-md-5 col-sm-12' style={{ marginTop: "10px" }}>
                    <MyAccount />
                </div>
                <div className='col-lg-7 col-md-5 col-sm-12'>
                    <br /><br />
                    <div className="table card2 col-sm-12 " >
                        <thead >

                        </thead>
                        <tbody >

                            {temp.map((value, index) => {

                                return (
                                    <tr key={index} >

                                        <h5><span className='text-success'>Transit</span> Order BY:{index + 1}</h5>
                                        <p><span className='text-danger'>DATE</span>:{value.date}</p>

                                        <div className='row'>

                                            {temp[index].items.map((val) => {

                                                return (
                                                    <div className='row  col-5 ' >
                                                        <div className=''>

                                                            <img src={val.product_image} height="200px" width="200px" className='img-fluid' />&nbsp;


                                                        </div>



                                                    </div>


                                                );

                                            })
                                            }
                                        </div>


                                        <tr>
                                            <td>
                                                <button className=' btn btn-info mt-2 ' onClick={() => invoice(value.Orderno)}>VIEW INVOICE PDF</button></td>
                                            <br />
                                        </tr>
                                    </tr>
                                );
                            })
                            }

                        </tbody>

                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

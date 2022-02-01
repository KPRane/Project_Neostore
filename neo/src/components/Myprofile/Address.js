import React, { useEffect, useState, } from 'react'
import { Container, Row, Col, Image, Button, Form, InputGroup, Modal, FloatingLabel, Card } from 'react-bootstrap'

import { FaUserAlt, FaRegAddressCard, FaList } from 'react-icons/fa'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { BsCheck2Square } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa';
import MyAccount from './MyAccount';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';
import { addAddress, deleteAddr, editAddress, getaddress1 } from '../../config/MyService'
//import{getProfile} from "../../config/MyService"
import { cardaddress } from '../../config/MyService';
import { useLocation } from 'react-router'
import Footer from "../Footer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export default function Address(props) {
    const [errors, setError] = useState({
        err_oldpass: '', err_npass: '', err_cpass: '', err_fname: '', err_lname: '', err_mobile: '',
        err_address: '', err_pincode: '', err_city: '', err_state: '', err_country: ''
    })
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });
    const location = useLocation();
    console.log(location.state)
    const [user, setUser] = useState([]);
    const [showadd, setShowadd] = useState(false);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('')
    const [show, setShow] = useState(false);
    const [Address_id, setAddress_id] = useState('');
    const [status, setStatus] = useState(false)
    const [getAddress, setGetAddress] = useState([])
    const History = useHistory();

    console.log(getAddress)

    // useEffect(() => {
    //     getProfile(localStorage.getItem('user'))
    //         .then(res => {
    //             if (res.data.user) {
    //                 console.log(res.data.user);
    //                 console.log(res.data.address)

    //                 let data = res.data.user;
    //                 setUser(data);
    //                 setGetAddress(res.data.address)
    //                 //console.log(user)
    //                 // console.log(user.Address)


    //             }
    //         })
    // }, [show, status])

    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            getaddress1(localStorage.getItem('user'))
                .then(res => {

                    console.log(res.data.address)


                    setGetAddress(res.data.address)
                    console.log(getAddress)

                })
        }
        else {
            History.push("/")
        }

    }, [show, status])


    const Addnewaddress = (e) => {
        e.preventDefault();
        console.log("Add Address")
        let email = localStorage.getItem('user')
        let data = { email: email, address: address, pincode: pincode, city: city, state: state, country: country }
        console.log(data)
        addAddress(data)
            .then((res) => {
                console.log(res.data)
            })
        setShow(false)
        // window.location.reload();

    }

    const editadd = (event, addr) => {
        event.preventDefault();
        console.log(addr)
        console.log("edit  address clicked")
        setAddress(addr.address)
        setPincode(addr.pincode)
        setCity(addr.city)
        setState(addr.state)
        setCountry(addr.country)
        setAddress_id(addr.Address_id)
        setShowadd(true);
        console.log(showadd)
        success("Address Updated Successfully");
    }



    const handleClose = () => setShow(false);
    const Addaddress = (e) => {
        e.preventDefault();
        let update = true;
        console.log("Add Address")
        let email = localStorage.getItem('user')
        let data = { Address_id: Address_id, email: email, address: address, pincode: pincode, city: city, state: state, country: country, update: update }
        console.log(data)
        editAddress(data)
            .then((res) => {
                console.log(res.data)
            })

        setShowadd(false)
        success("Address Added Successfully");
        setTimeout(() => {
            window.location.reload();
        }, 2000);


    }

    // const deleteAdd = (e, addr) => {
    //     e.preventDefault();
    //     console.log(addr)
    //     let email = localStorage.getItem('user')
    //     deleteAddr(email, addr)
    //         .then((res) => {
    //             console.log(res.data)
    //             setStatus(true)
    //         })
    //     setStatus(false)

    // }
    const goback = () => {
        History.push("/checkout")
    }
    const selectadd = (e, addr) => {
        e.preventDefault();
        let useraddress = { email: localStorage.getItem('user'), selectaddr: addr, orderno: location.state.orderno }
        cardaddress(useraddress)
            .then((res) => {
                console.log(res.data)

                success("Address is Selected")
                // localStorage.removeItem("mycart");

            });

    }
    const checkout = () => {
        success("ORDERED SUCESSFULLY PLACED")
        localStorage.removeItem("mycart");
        History.push("/Order")
    }
    const handleShow = () => setShow(true);

    return (
        <>

            <Container fluid className='card4'>
                <Container  >
                    <button className='btn btn-secondary ' style={{ "marginTop": "20px" }} onClick={goback}>Go Back</button>
                    <h3 className='display-6 text-center'>My Account</h3>
                    <hr />
                    <Row >
                        <Col lg={6} md={6} sm={12} >
                            <MyAccount />
                        </Col>
                        <Col lg={6} md={6} sm={12} >
                            <div className='card11'>
                                <section >

                                    <Row className="pt-2">
                                        <h2 className='display-6'>Address</h2>
                                        <div style={{ textAlign: "right" }}>
                                            <Button variant="danger" size="sm" onClick={handleShow} className="ml-5 text-uppercase">
                                                Add Address
                                            </Button>
                                        </div>

                                    </Row>
                                    < hr className="mr-3" />
                                </section>


                                <section >

                                    {getAddress.map((addr) =>
                                        <Row >
                                            <div className='card7'>
                                                <tr> <td><h6>{addr.address}, {addr.state}</h6> </td><td ><a className='btn ' onClick={(e) => { selectadd(e, addr) }} style={{ marginLeft: "250px" }} ><BsCheck2Square style={{ fontSize: "25px" }} /></a></td></tr>
                                                <h6>{addr.city} ,{addr.pincode}</h6>
                                                <h6>{addr.country}</h6>
                                                <div>
                                                    <button className='btn  btn-lg ' onClick={(e) => { editadd(e, addr) }} ><MdModeEdit className='text-danger' /></button>
                                                    {/* <button className='btn btn-lg' onClick={(e) => { deleteAdd(e, addr) }} style={{ marginLeft: "10px" }}><MdDelete /></button> */}

                                                </div>

                                            </div>



                                            {showadd ?
                                                <Modal show={showadd} onHide={handleClose} >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title >Edit Your Account Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form >
                                                            <h6>Edit Your Account</h6>
                                                            <FloatingLabel label="Address" className="mb-3">
                                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                                                <Form.Text id="passwordHelpBlock" muted>
                                                                    Max 100 char
                                                                </Form.Text>
                                                                <span style={{ color: 'red' }}>{errors.err_address}</span>
                                                            </FloatingLabel>

                                                            <Row>
                                                                <Col sm={6} md={6} lg={6}>
                                                                    <Form.Group className="mb-3" >
                                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                                        <span style={{ color: 'red' }}>{errors.err_pincode}</span>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                                    <Form.Control type="text" name="city" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                                                    <span style={{ color: 'red' }}>{errors.err_city}</span>
                                                                </Form.Group></Col>
                                                            </Row>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="state" placeholder='State' value={state} onChange={(e) => { setState(e.target.value) }} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_state}</span>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="country" placeholder='Country' value={country} onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_country}</span>
                                                            </Form.Group>

                                                            <div style={{ textAlign: "center" }}>
                                                                <Button variant="primary" type="submit" onClick={Addaddress} >
                                                                    Submit
                                                                </Button>
                                                            </div>
                                                        </Form>

                                                    </Modal.Body>

                                                </Modal>
                                                : ''}
                                        </Row>

                                    )}
                                    <div className='text-center'>
                                        <button className=' btn btn-danger text-uppercase' style={{ width: "100px" }} onClick={checkout}>Checkout</button></div>
                                </section>

                                <Modal show={show} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title >Add Address Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form  >

                                            <FloatingLabel label="Address" className="mb-3">
                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" onChange={(e) => { setAddress(e.target.value) }} />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Max 100 char
                                                </Form.Text>
                                                {<span style={{ color: 'red' }}>{errors.err_address}</span>}
                                            </FloatingLabel>

                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                        {<span style={{ color: 'red' }}>{errors.err_pincode}</span>}
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                    <Form.Control type="text" name="city" placeholder='City' onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                                    {<span style={{ color: 'red' }}>{errors.err_city}</span>}
                                                </Form.Group></Col>
                                            </Row>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="state" placeholder='State' onChange={(e) => { setState(e.target.value) }} className="form-control" size="20" />
                                                {<span style={{ color: 'red' }}>{errors.err_state}</span>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="country" placeholder='Country' onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                                {<span style={{ color: 'red' }}>{errors.err_country}</span>}
                                            </Form.Group>

                                            <div style={{ textAlign: "center" }}>
                                                <Button variant="primary" type="submit" onClick={Addnewaddress} >
                                                    Submit
                                                </Button>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </div>
                                        </Form>

                                    </Modal.Body>

                                </Modal>
                            </div>
                        </Col>


                    </Row>


                </Container>
            </Container>
            <Footer />
        </>
    )
}


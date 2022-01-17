import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { getProfile, changePass } from '../../config/MyService';
import MyAccount from './MyAccount';
import Footer from "../Footer"
export default function ChangePassword() {
    let [password, setPassword] = useState('');
    let [newpassword, setNewpassword] = useState('');
    let [confirmpassword, setConfirmpassword] = useState('');
    let [user, setUser] = useState('');
    const [errors, setError] = useState({ err_vcode: '', err_npass: '', err_cpass: '', err_email: '' })
    let [otp, setOtp] = useState('')
    const vcode = useRef('');
    const History = useHistory()
    const handler = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'vcode':
                console.log(user.password)
                console.log(user.name)
                console.log(vcode.current.value == user.password)
                const e_vcode = (vcode.current.value == user.password) ? '' : 'Password does not match';
                setError({ err_vcode: e_vcode })
                break;

            default:

                break;
        }
    }

    useEffect(() => {
        getProfile(localStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    setUser(res.data.user);

                }
            })
    }, [])

    const changepassword = async (id) => {
        let data = { password: password, confirmpassword: confirmpassword }
        console.log(data)
        changePass(id, data)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err);
                }
                else {
                    alert(res.data.msg);
                    History.push('/Profile')

                }
            })
    }
    return (
        <div>
            <Container className='card4'>
                <h3 className='display-6 text-center'>My Account</h3>
                <hr />
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <MyAccount />

                    </Col>

                    <Col lg={6} md={6} sm={12}>
                        <Container >
                            <div className="card1 text-uppercase">
                                <h4 className="text-center display-6">Change Password </h4>
                                <hr />
                                <Form>

                                    <Form.Group className="mb-3 mt-1" controlId="formBasicEmail">

                                        <Form.Label>Old Password</Form.Label>

                                        <Form.Control type="text" placeholder="Enter Old Password" name="vcode" onChange={handler} className="form-control" ref={vcode} />
                                        <span style={{ color: 'red' }}>{errors.err_vcode}</span><br />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter New Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                        {password != '' && password.length < 8 && <span className="text-danger">Enter New Password  correctly</span>}

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Confirm Password" name="newpassword" onChange={(e) => { setConfirmpassword(e.target.value) }} />
                                        {confirmpassword != '' && confirmpassword != password && <span className="text-danger">Enter Confirm Password  correctly</span>}
                                    </Form.Group>
                                    <Button variant="danger" onClick={() => changepassword(user._id)}>
                                        Change Password
                                    </Button>
                                </Form>
                            </div>
                        </Container>
                    </Col>

                </Row>
            </Container>
            <Footer />
        </div>
    )
}

import React, { useState } from "react";


import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { getchangepassword } from "../config/MyService"

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Otp() {
    const history = useHistory();
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [code, setCode] = useState("");
    let [confirmpassword, setConfirmpassword] = useState("");


    const back = () => {
        history.push("/forgot")
    }
    const changepwd = () => {
        let data = {
            email: email,
            code: code,
            password: password
        };
        getchangepassword(data)
            .then((res) => {
                if (res.data.err) {
                    alert(res.data.err);
                }
                else {
                    alert(res.data.msg);
                    history.push("/");
                }

            });

    }

    return (
        <div>

            <div className="container col-md-6  cardLogin border">
                <h2>Recover Password</h2>
                <hr />
                <h6 className="text-danger">
                    <AiOutlineInfoCircle size="20px" /> &nbsp;Verification Code has sent
                    to your registered mail ID
                </h6>
                <br />
                <form method="post">
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Enter Verfication Code"
                            name="code"
                            id="code"
                            onChange={(event) => {
                                setCode(event.target.value);
                            }}
                            required
                        />
                        {code != "" && code.length < 4 && (
                            <span className="text-danger">Enter Code Correctly!</span>
                        )}
                    </Form.Group>
                    <br />
                    <br />
                    {/* <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            id="email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            required
                        />
                        {email != "" && !regForEmail.test(email) && (
                            <span className="text-danger">Enter email correctly</span>
                        )}
                    </Form.Group> */}
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            id="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            required
                        />
                        {password != "" && password.length < 8 && (
                            <span className="text-danger">Enter password correctly</span>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Enter ConfirmPassword"
                            name="confirmpassword"
                            id="confirmpassword"
                            onChange={(event) => {
                                setConfirmpassword(event.target.value);
                            }}
                            required
                        />
                        {confirmpassword != "" && confirmpassword != password && (
                            <span className="text-danger">Passwords doesn't match</span>
                        )}
                    </Form.Group>
                    <br />
                    <br />
                    <div className="text-center">
                        <input

                            value="Submit"
                            className="btn btn-primary text-center"
                            onClick={changepwd}
                        /> &nbsp;&nbsp;&nbsp;
                        <input
                            type="submit"
                            value="Back"
                            className="btn btn-dark text-center"
                            onClick={back}
                        />
                    </div>
                </form>
            </div>

        </div>
    );
}

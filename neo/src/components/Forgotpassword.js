import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { getEmail } from "../config/MyService";
import Otp from "./Otp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Forgotpassword() {
  const [flag, setFlag] = useState(0);
  let [email, setEmail] = useState("");
  const history = useHistory();
  // const handler = (event) => {
  //   const { name, value } = event.target;
  //   setEmail({ ...state, [name]: value });
  // };
  const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });
  const back = () => {
    history.push("/");
  };
  const sendotp = () => {
    let data = {
      email: email,
    };
    getEmail(data).then((res) => {
      if (res.data.err) {
        failure(res.data.msg);
      } else {
        history.push("/otp");
        success(res.data.msg);

      }
    });
  };

  return (
    <div>

      <br />
      {flag == 0 ? (
        <div className="container col-md-6  cardLogin border">
          <h2>Reset Password</h2>
          <hr />
          <br />
          <form method="post">
            <Form.Group className="mb-3">
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
            </Form.Group>
            <br />
            <br />

            <div className="text-center">
              <input
                value="Send OTP"
                onClick={sendotp}
                className="btn btn-primary text-center"
              />
              &nbsp;&nbsp;&nbsp;
              <input
                value="Back "
                onClick={back}
                className="btn btn-dark text-center"
              />
            </div>
          </form>
        </div>
      ) : (
        <Otp />
      )}
    </div>
  );
}

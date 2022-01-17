import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function Footer() {
    return (
        <footer className="container-fluid bg-dark w-100 ">
            <div >
                <div className="row">
                    <div className="col-md-4 footer-column mt-5">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <h4 className="footer-title text-light">About Company</h4>
                            </li>
                            <li className="nav-item text-light">
                                <a className="nav-link text-white" href="#">
                                    NeoSTORE Pvt Ltd.
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white " href="#">
                                    <HiOutlineLocationMarker /> Ruby Tower,Dadar, Mumbai-412
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    <AiOutlineMail /> Nesostore@gmail.com
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    <AiOutlinePhone /> Contact No: 9976452312
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-column mt-5">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <h4 className="footer-title text-light">Information</h4>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="https://www.gcu.ac.uk/media/gcalwebv2/theuniversity/supportservices/financeoffice/Online%20Store%20Terms%20%20Conditions.pdf">
                                    Terms and Conditions
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Gurantee and Return Policy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/Map">
                                    Locate Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-column mt-5">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <h4 className="footer-title text-light">NewsLetter</h4>
                            </li>
                            <li className="nav-item">
                                <span className=" text-white">
                                    Sign Up to get exclusive offer from our favourite brand.
                                </span>
                            </li><br />
                            <li className="col-md-4">
                                <input type="email" className="sha form-control" placeholder="Your Email"></input>
                            </li>
                            <br />
                            <li className="col-md-4">
                                <button className="btn btn-light sha">Subscribe</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <br />

                <div >
                    <h6 className="text-center text-light " style={{ paddingBottom: "20px" }}>
                        Copyright &copy; 2021 NeoSTORE All rights reserved | Design by
                        KAMESH{" "}
                    </h6>

                </div>
            </div>
        </footer>


    );
}
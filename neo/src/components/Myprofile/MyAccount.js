import React, { useState, useEffect, useRef } from 'react';
// import { Outlet } from 'react-router-outlet'
import { Container } from 'react-bootstrap'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight } from 'react-icons/bs'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md'
import Footer from "../Footer"
import { getProfile, getMulter, getImage, updProfile } from '../../config/MyService';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';
import '../../App.css';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);


export default function MyAccount() {
    let [user, setUser] = useState([]);
    // const [file, setFile] = useState("");
    const [showInvoice, setShowInvoice] = useState(false)
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [lname, setLname] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    let [email, setEmail] = useState('');
    const History = useHistory();
    const [mainimage, setMainImage] = useState("")
    const [profileImg, setprofileImg] = useState("")

    useEffect(() => {

        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            // setUid(decode.uid)
            getProfile(localStorage.getItem('user'))
                .then(res => {
                    if (res.data.user) {
                        console.log(res.data.user);
                        let data = res.data.user;
                        setUser(data);
                        setEmail(data.email);
                        setName(data.name);
                        setPhone(data.phone);
                        getImage1();
                    }
                })
        }
        else {
            History.push("/")
        }
    }, [])
    const onSubmit1 = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', profileImg)
        getMulter(formData, localStorage.getItem('user')).then(res => {
            if (res) {
                console.log(res);
                getImage1();

            }
        })

    }
    const getImage1 = () => {
        let user = localStorage.getItem('user');
        getImage(user)
            .then(res => {

                if (res.data.err == 0) {
                    setMainImage(res.data.data.profileImg);

                }
                else {
                    setMainImage("images/pro.jpg")
                }
            })
    }
    const onFileChange = (e) => {
        setprofileImg(e.target.files[0])
    }

    const handleSubmit = (e) => {

        e.preventDefault()
    }
    return (


        <div>
            <div className='container-fluid'>


                <div className=" text-center col-lg-5 col-md-12 col-sm-12 mt-5" >
                    {/* <HiUserCircle className="text-center" size="200px" /> */}
                    <img src={mainimage} height="200px" width="200px" className='card1'></img><br /><br />
                    <div >
                        <div className="row">
                            <form onSubmit={onSubmit1}>
                                <div className="container text-center" >
                                    <div className="form-group   text-center">
                                        <input type="file" onChange={onFileChange} className="form-control sha " />
                                    </div>
                                    <br />
                                    <div className="form-group text-center">
                                        <button className="btn  sha" type="submit"><AiOutlineCloudUpload size="30px" className='text-danger' /></button>
                                    </div>
                                </div>
                                <br /><br></br>
                            </form>
                        </div>
                    </div>
                    <h4 className="text-danger text-center mt-1">{user.name}&nbsp;{user.lname}</h4><br />
                    <div  >
                        <a className='btn sha text-center ' style={{ width: "200px" }} href="/Order"><HiOutlineMenuAlt2 style={{ margin: '5 5 5 5' }} size="30px" />Order</a><br /><br />
                        <a className='btn sha text-center' style={{ width: "200px" }} href="/Profile"><MdAccountBox style={{ margin: '5 5 5 5' }} size="30px" />Profile</a><br /><br />
                        <a className='btn sha text-center' style={{ width: "200px" }} href="/Address"><MdLibraryBooks style={{ margin: '5 5 5 5' }} size="30px" />Address</a><br /><br />
                        <a className='btn  sha text-center' style={{ width: "200px" }} href="/ChangePasssword"><BsArrowLeftRight style={{ margin: '5 5 5 5' }} size="30px" />ChangePasssword</a><br /><br />
                    </div>
                </div>

            </div>

        </div>



    )
}


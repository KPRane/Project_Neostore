import React, { useEffect, useState } from 'react'
import { getsingleproduct, StarRating } from "../config/MyService"
import { useLocation } from "react-router";
import ReactImageMagnify from 'react-image-magnify'
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from "react-share"
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ReactStars from "react-rating-stars-component";
import { Rating } from 'react-simple-star-rating';
import { connect } from "react-redux";
import axios from "axios"
// import jwt_decode from 'jwt-decode';
import Footer from './Footer'
import { FaBullseye } from 'react-icons/fa';


function ProductDetails(props) {
    const [postdata, setPostdata] = useState([])
    const [images, setimages] = useState([])
    const [mainimage, setmainimage] = useState()
    const [rating, setrating] = useState(0)
    const [uid, setUid] = useState('')
    let location = useLocation();
    const ratingChanged = (rating) => {
        console.log(rating);
    };

    // useEffect(() => {

    //   if (localStorage.getItem('_token') != undefined) {
    //     let token = localStorage.getItem('_token');
    //     let decode = jwt_decode(token);
    //     console.log(decode)
    //     setUid(decode.uid)
    //     getPosts()
    //       .then(res => {
    //         console.log(res.data);
    //         if (res.data.err == 0) {
    //           setPostdata(res.data.data);
    //         }
    //       })
    //   }
    // }, [])
    const addtoCart = (obj) => {
        console.log(obj.name);
        let item = {
            name: obj.product_name,
            price: obj.product_cost,
            _id: obj._id,
            quantity: 1,
            image: obj.product_image,
            des: obj.product_desc,
        };
        if (localStorage.getItem("mycart") !== null) {
            let arr = JSON.parse(localStorage.getItem("mycart"));
            let idArrays = [];
            arr.forEach((data) => {
                idArrays.push(data._id);
            });

            if (idArrays.includes(obj._id)) {

                alert("Product Already Added");

            } else {
                arr.push(item);
                localStorage.setItem("mycart", JSON.stringify(arr));
                alert("Product Added to Cart");
                window.location.reload(false);

            }
        } else {
            let arr = [];
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            alert("Product Added to Cart");
            window.location.reload();

        }
    };
    const handleRating = (rate) => {
        let newrating = ((((rate / 20) + (rating / 20)) / 2).toFixed(1))
        let data = { newrating: newrating }

        //setRatings(rate)
        setrating(rate)
        console.log(rate / 20)
        console.log(data)
        StarRating(location.state.id, data)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err);
                }
                else {
                    //alert(res.data.msg);
                }

            })

    }

    useEffect(() => {
        console.log(location.state.id)
        getsingleproduct(location.state.id)

            .then(res => {
                console.log(res.data);
                document.documentElement.style.setProperty('--background-color', res.data.product.color_id.color_code)


                setrating(res.data.product.product_rating)
                setPostdata(res.data.product);
                setmainimage(res.data.product.product_image)
                setimages(res.data.image)
                console.log(res.data.product.product_rating)
            })


    }, [])
    console.log(postdata)
    // console.log(location.state.id)
    return (
        <div>
            <div >
                <br />
                <div className="container-fluid">

                    <br /><br />
                    <div className='row'>

                        <div className='container col-10'>

                            <div className=" row">

                                <div className=" col-md-6">
                                    <ReactImageMagnify {...{
                                        smallImage: {
                                            alt: 'Wristwatch by Ted Baker London',
                                            isFluidWidth: true,
                                            src: mainimage
                                        },
                                        largeImage: {
                                            src: mainimage,
                                            width: 1200,
                                            height: 1800
                                        }
                                    }} />
                                    {/*
                                     <img src={mainimage} className="img-fluid" alt="..." height="500px" width="500px" /> */}



                                </div>
                                <div className='col-md-6'>
                                    <div className="">
                                        <h4 className="">{postdata.product_name}</h4>
                                        {/* <ReactStars
                                            count={5}

                                            // onChange={(e) => { setRating(e.target.value) }}
                                            size={25}

                                            activeColor="#ffd700"
                                            className="center "
                                            edit={false}
                                            isHalf={true}
                                          
                                            value={rating} /> */}

                                        <Rating onClick={handleRating} ratingValue={rating} /><hr />
                                        <br />
                                        <p>color :<span className="dynamiccol">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                                        <p>Price :<span className="text-success"> ${postdata.product_cost}</span></p>
                                        <p>Dimension :<span className="text-dark"> ${postdata.product_dimension}</span></p>
                                        <p>Material:<span className="text-dark"> ${postdata.product_material}</span></p>



                                    </div>
                                    <h4>Share:</h4>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <FacebookShareButton

                                                url="https://www.pepperfry.com/"
                                                title={"Checkout " + postdata.product_name}
                                                hashtag='#react'
                                            >
                                                <FacebookIcon logofillColor="white" round={true}></FacebookIcon>
                                            </FacebookShareButton>
                                        </div>
                                        <div className='col-2'>
                                            <WhatsappShareButton
                                                url="https://www.pepperfry.com/"
                                                title={"Checkout " + postdata.product_name}
                                                hashtag='#react'
                                            >
                                                <WhatsappIcon logofillColor="white" round={true}></WhatsappIcon>
                                            </WhatsappShareButton>
                                        </div>
                                        <div className='col-2'>
                                            <TwitterShareButton
                                                url="https://www.pepperfry.com/"
                                                title={"Checkout " + postdata.product_name}
                                                hashtag='#react'
                                            >
                                                <TwitterIcon logofillColor="white" round={true}></TwitterIcon>
                                            </TwitterShareButton>
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <div className='col-4'> <button className="btn btn-danger text-uppercase" onClick={() => addtoCart(postdata)} >Add to cart</button></div>
                                        {/* <div className='col-4'> <a className="btn btn-secondary text-uppercase">Rate product</a></div> */}

                                    </div>
                                </div>
                            </div>
                            {
                                images.map((item) =>
                                    <button className='btn img-fluid' width="100px" height="400px" onClick={() => setmainimage(item)}> <img src={item} width="100px" height="60px" className='img-fluid' /></button>
                                )
                            }
                            <hr />
                            <p >{postdata.product_desc}</p><br />
                        </div>

                    </div>

                </div>
                <br /><br />
                <Footer />
            </div >
        </div>
    )
}

export default ProductDetails;
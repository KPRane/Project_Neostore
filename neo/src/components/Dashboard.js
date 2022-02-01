import React, { useEffect, useState } from 'react'
import { getPosts } from '../config/MyService'
import { connect } from "react-redux";
// import jwt_decode from 'jwt-decode';
import Footer from './Footer'

import { useHistory } from 'react-router'
import NavbarDash from './NavbarDash';
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function Dashboard(props) {
  const [postdata, setPostdata] = useState([])
  const [uid, setUid] = useState('')
  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  const History = useHistory();
  const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });
  useEffect(() => {
    getPosts()
      .then(res => {
        console.log(res.data);
        // if (res.data.err == 0) {
        //   setPostdata(res.data.product);
        // }
        setPostdata(res.data.data1);
      })
      .catch((err) => {
        if (err) {
          failure("Oops! :-( There is some issue at our Server!")
        }
      });

  }, [])
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

        warning("Product Already Added");

      } else {
        arr.push(item);
        localStorage.setItem("mycart", JSON.stringify(arr));
        success("Product Added to Cart");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      }
    } else {
      let arr = [];
      arr.push(item);
      localStorage.setItem("mycart", JSON.stringify(arr));
      success("Product Added to Cart");
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    }
  };
  const singleitem = (id) => {
    console.log(id)

    History.push(
      {
        pathname: '/ProductDetails',
        // search: id
        state: { id: id }
      }
    )
  }
  console.log(postdata)
  return (
    <div >
      <br /><br />
      <div className="container-fluid col-md-12 col-lg-12 col-sm-12">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="images/14.jpg" className="d-block w-100 img-fluid" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="images/33.jpg" className="d-block w-100 img-fluid" alt="..." height="400px" />
              <div class="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="images/222.jpg" className="d-block w-100 h-50 img-fluid" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <br /><br />
        {/* {postdata[0].name}  style={{backgroundColor:"#D7E9F7"}}*/}
        <h4 className='text-center'> Popular Products</h4>
        <p className='text-center'>View All</p><br />
        <div className='container'>
          <div className=" row">
            {postdata.map((val, index) =>
              <div className="   col-md-3 col-lg-3 col-md-6">
                <div className="card1" >
                  <img src={val.product_image} className="card-img-top" alt="..." height="200px" onClick={() => singleitem(val._id)} />
                  <div className="card-body ">
                    <ReactStars
                      count={5}

                      // onChange={(e) => { setRating(e.target.value) }}
                      size={25}

                      activeColor="#ffd700"
                      className="center "
                      edit={true}
                      isHalf={true}
                      value={val.product_rating} />
                    <h5 className="card-title" onClick={() => singleitem(val._id)}>{val.product_name}</h5>
                    {/* <h5 className="card-title">{val.product_desc}</h5> */}
                    <p className="card-text" >Price:${val.product_cost}</p>
                    {/* <p className="card-text">Dimension:{val.product_dimension}</p> */}
                    {/* <p className="card-text">Material:{val.product_material}</p> */}
                    <div className='text-center'>
                      <a className="btn btn-danger " onClick={() => addtoCart(val)} >Add to cart</a>

                    </div>

                  </div>
                </div>
              </div>)}

          </div>
        </div>
      </div><br /><br />
      <Footer />
    </div>
  )
}

export default Dashboard;
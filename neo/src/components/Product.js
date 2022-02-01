import React, { useEffect, useState } from 'react'
import { getProduct, getcategory } from '../config/MyService'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ReactStars from "react-rating-stars-component";
import { useHistory } from 'react-router'
// import jwt_decode from 'jwt-decode';
import Pagination from "./Pagination"
import Footer from './Footer'
import ProductDetails from './ProductDetails';
import { BsSortUpAlt, BsSortDown } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Product(props) {
    const [show, setShow] = useState(true);
    const [showdata, setshowdata] = useState(1)
    const [postdata, setPostdata] = useState([])
    const [category, setCategory] = useState([])
    const [uid, setUid] = useState('')
    const [temp, settemp] = useState('dummy')
    const [temp1, settemp1] = useState('dummy')
    const [search, setSearch] = useState('')
    const History = useHistory();
    let [email, setEmail] = useState('')
    const [rating, setRating] = useState('')
    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postdata.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });
    const ratingChanged = () => {
        const sort_products = postdata;
        sort_products.sort(function (a, b) {
            var nameA = a.product_rating
            var nameB = b.product_rating
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
        setPostdata(sort_products);
    }
    const Dprice = () => {
        setshowdata(1)
        setTimeout(() => {
            for (var i = 0; i < postdata.length; i++) {
                for (var j = 0; j < (postdata.length - i - 1); j++) {
                    if (postdata[j].product_cost > postdata[j + 1].product_cost) {
                        var temp = postdata[j]
                        postdata[j] = postdata[j + 1]
                        postdata[j + 1] = temp
                    }
                }
            }
            setPostdata(postdata)
            setshowdata(0)
        }, 1000);
    }
    const Iprice = () => {
        setshowdata(1)
        setTimeout(() => {
            for (var i = 0; i < postdata.length; i++) {
                for (var j = 0; j < (postdata.length - i - 1); j++) {

                    if (postdata[j].product_cost < postdata[j + 1].product_cost) {
                        var temp = postdata[j]
                        postdata[j] = postdata[j + 1]
                        postdata[j + 1] = temp
                    }
                }
            }
            setPostdata(postdata)
            setshowdata(0)
        }, 1000);
    }

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
    const handler = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "Category": settemp(e.target.value)
                console.log(e.target.value)
                break;
            case "Color": settemp1(e.target.value)
                console.log(e.target.value)
                break;

        }


    }
    // category_id, color_id
    const handlecat = () => {
        if (temp == "dummy" && temp1 == "dummy") {

            alert("PLS SELECT ATLEAST ONE CATEGORY")
        } else {
            getcategory(temp, temp1)
                .then(res => {
                    console.log(res.data);

                    setPostdata(res.data.product);
                })
        }

    }
    const Initial = () => {
        getProduct()
            .then(res => {
                console.log(res.data);

                setPostdata(res.data.product);
            })

    }
    useEffect(() => {
        setEmail(localStorage.getItem('user'));
        Initial();

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
    console.log(postdata)
    return (
        <div >
            <br />
            <div className="container-fluid col-md-12 col-lg-12 ">

                <br />
                <div className='row'>
                    <div className='container   col-md-6 col-lg-2 col-sm-12 text-center'>
                        <>


                            <button className='btn btn-light sha' onClick={Initial} style={{ width: "150px" }} >All Product</button><br /><br />
                            <select className=" btn sha text-center" aria-label="Default select example" name="Category"
                                style={{ width: "150px" }} onChange={handler}>
                                <option selected value="dummy">Category</option>
                                <option value="61cc0950de8b502a31b9e0f9">Bed</option>
                                <option value="61cc0950de8b502a31b9e0fa">Sofa & Recliner</option>
                                <option value="61cc0950de8b502a31b9e0fb">Cabinetry</option>
                            </select><br /><br />
                            <select className=" btn sha text-center " aria-label="Default select example" name="Color"
                                style={{ width: "150px" }} onChange={handler}>
                                <option selected value="dummy">Color</option>
                                <option value="61cc0c7fde8b502a31b9e101">woodenhoney</option>
                                <option value="61cc0c7fde8b502a31b9e100">walnut</option>

                                <option value="61cc0c7fde8b502a31b9e0fc">beige</option>
                                <option value="61cc0c7fde8b502a31b9e0fd">white</option>
                                <option value="61cc0c7fde8b502a31b9e0fe">blue</option>
                                <option value="61cc0c7fde8b502a31b9e0ff">black</option>
                                <option value="61e14fcd76efba0528a0e8d6">Red</option>
                                <option value="61cc3370de8b502a31b9e108">green</option>
                            </select><br /><br />
                            <button className='btn sha' onClick={handlecat} style={{ width: "150px" }} >Apply Filter</button>
                        </>

                    </div>
                    <br /><br />
                    <div className='container mt-10  col-md-12 col-lg-10 '>
                        <div className="row  ">
                            <div className="col-lg-8   col-md-6 col-sm-6">
                                <input type="text" className="form-control sha " placeholder="Search..." onChange={event => { setSearch(event.target.value) }} style={{ width: "100%" }} />
                            </div>
                            <div className="col-lg-1   col-md-1  col-sm-1 text-center text-justify-end" style={{ marginTop: "5px" }}>
                                <h6>Sort by:</h6> </div>
                            <div className="col-lg-1  col-md-2  col-sm-2 ">
                                <a href="#" onClick={ratingChanged} className="pr-4 btn sha "><FiStar size="25px" /></a>
                            </div>
                            <div className="col-lg-1  col-md-2 col-sm-2 ">
                                <button className="btn sha" onClick={Dprice}> <BsSortDown size="25px" /></button>
                            </div>
                            <div className="col-lg-1   col-md-1  col-sm-2">
                                <button className="btn sha" onClick={Iprice}><BsSortUpAlt size="25px" /></button>
                            </div>
                        </div>


                        <div className=" row">


                            {postdata.filter((val) => {
                                if (search == "") {
                                    return val;
                                }
                                else if ((val.product_name).toLowerCase().includes(search.toLowerCase())) {
                                    return val;
                                }

                            }).slice(indexOfFirstPost, indexOfLastPost)
                                .map((val, index) =>

                                    <div className=" col-md-6 col-lg-3 col-sm-12  ">
                                        <div className=" card1" key={val._id}>
                                            <img src={val.product_image} onClick={() => singleitem(val._id)} className="card-img-top" alt="..." height="200px" width="300px" />

                                            <div className="card-body">
                                                <ReactStars
                                                    count={5}

                                                    // onChange={(e) => { setRating(e.target.value) }}
                                                    size={25}

                                                    activeColor="#ffd700"
                                                    className="center "
                                                    edit={false}
                                                    isHalf={true}
                                                    value={val.product_rating} />
                                                <h5 className="card-title" onClick={() => singleitem(val._id)}>{val.product_name}</h5>
                                                {/* <h5 className="card-title">{val.product_desc}</h5> */}
                                                <p> Price<span className="card-text text-success">:${val.product_cost}</span></p>


                                                <div className='text-center'>
                                                    <button className="btn btn-danger text-center" onClick={() => addtoCart(val)}>Add to cart</button></div>

                                            </div>

                                        </div>

                                    </div>

                                )}

                        </div>
                        <div className="container  ">
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={postdata.length}
                                paginate={paginate}

                            />
                        </div>
                    </div>
                </div>

            </div>
            <br /><br />
            <Footer />
        </div >
    )
}

export default Product;
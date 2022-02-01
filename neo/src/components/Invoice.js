import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Card,
    Image,
    Row,
    Table,
} from "react-bootstrap";
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import { getinvoice } from "../config/MyService";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { sendMail } from "../config/MyService";
import { SiMinutemailer } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";
import { useLocation } from "react-router";
import { FaRupeeSign } from "react-icons/fa";

const ref = React.createRef();

export default function Invoice() {
    //   const [state, setState] = useState([]);
    //   const [items, setItems] = useState([]);
    const [temp, settemp] = useState([]);

    const location = useLocation();
    // console.log(location.state);

    // console.log(location.state.orderno); 
    let innum = Math.random().toFixed(6).split('.')[1];

    const History = useHistory();
    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            getinvoice(location.state.orderno).then((res) => {
                if (res.data.orderdetail) {
                    console.log(res.data.orderdetail);
                    let data1 = res.data.orderdetail;
                    settemp(data1);
                    console.log(data1);
                    console.log(temp);
                } else {
                    console.log(res.data.err);
                }
            });
        }
        else {
            History.push("/")
        }
    }, []);




    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "images/1.jpg"
            );

            pdf.addImage(img, "JPEG", 0, 0);
            pdf.save("Invoice.pdf");
        });
        console.log(html2canvas);
    };



    return (
        <div>

            <Container
                fluid
                style={{
                    height: "auto",
                }}
            >
                <br />
                <Card
                    style={{
                        padding: "30px 30px 30px 30px",
                        backgroundColor: "white",
                        maxWidth: "800px",
                        borderStyle: "10px solid black",
                        margin: "20px auto",
                        height: "auto",
                    }}
                    ref={ref}
                    id="divToPrint"
                >
                    <div >
                        <Row >
                            <Col md={7}>
                                <div>
                                    <Image
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOQJFVz74nPRsr9Ag0bhfYkfSpDdWdCrwtQ&usqp=CAU"
                                        width="100px"
                                        height="100px"
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h5 className="text-uppercase">Invoice Number:{innum}</h5>

                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col md={9}>
                                <p>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            color: "#333",
                                        }}
                                    >
                                        Sold By
                                    </span>
                                    <br />
                                    <span style={{ fontWeight: "bold" }}>Digital World</span>
                                    <br />
                                    NeoStore
                                    <br />
                                    36 , Green Downtown,Golden Road,FL
                                </p>
                                <br />
                                <p>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            color: "#333",
                                        }}
                                    >
                                        BILL TO
                                    </span>
                                    <br />

                                </p>
                            </Col>
                            <Col md={3}>
                                <h6>Billing Address</h6>
                                <p>John Doe<br />
                                    36 , Green Downtown,Golden Road,FL
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            {temp.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <div className="row">
                                            <div className="col-9">
                                                <p >User Email:<span className="text-secondary"> {value.email}</span></p>

                                                <h6>
                                                    <span className="text-danger"> OREDERD DATE:</span>:{value.date}
                                                </h6>
                                            </div>
                                            <div className="col-3">
                                                <h6>ORDER NO:{value.Orderno}</h6>
                                            </div>
                                        </div>



                                        {temp[index].items.map((val) => {
                                            return (

                                                <table className="table text-center  table-bordered " style={{ width: "740px", border: "1px solid black" }}>
                                                    <thead className="text-uppercase">
                                                        <tr>
                                                            <th colspan="2">Product Details </th>

                                                            <th> PRICE </th>
                                                            <th>QUANTITY </th>
                                                            <th>Total</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img
                                                                    src={val.product_image}
                                                                    height="150px"
                                                                    width="150px" />

                                                            </td>
                                                            <td>
                                                                <span> {val.product_name}</span>
                                                            </td>
                                                            <td>
                                                                <span>₹:{val.product_cost}</span>
                                                            </td>
                                                            <td>
                                                                <span>{val.quantity}</span>
                                                            </td>
                                                            <td>
                                                                {val.product_cost} *{val.quantity}= ₹:{val.product_cost * val.quantity}
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            );
                                        })}
                                        <div className="row">
                                            <div className="col-6">
                                                <table className="table table-bordered" style={{ border: "1px solid black" }}>

                                                    <tbody>
                                                        <tr><h6>SUBTOTAL</h6><td>₹:{(value.total) - (0.05 * value.total)}</td></tr>
                                                        <tr>
                                                            <h6>GST</h6><td>₹:{0.05 * value.total}</td> </tr>
                                                        <tr>
                                                            <h6>Total:</h6><td>₹:{value.total}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-2">

                                            </div>
                                            <div className="col-4">
                                                <h6> Shipping Address:</h6><p>{value.selectaddr.address}&nbsp;,
                                                    {value.selectaddr.city} <br />
                                                    {value.selectaddr.pincode},&nbsp;<br />{value.selectaddr.state}<br />
                                                    {value.selectaddr.country}</p>

                                            </div>

                                        </div>

                                        <br />
                                    </tr>
                                );
                            })}
                        </Row>
                    </div>


                </Card>
                <br />
                <Container>
                    <div className="text-center">
                        <Button variant="danger" onClick={() => generatePdf()}>
                            Save PDF <MdSaveAlt />
                        </Button>
                        &nbsp; &nbsp;&nbsp; &nbsp;

                    </div>
                </Container>
            </Container>
        </div>
    );
}
// import React, { useEffect, useState } from "react";
// import {
//     Button,
//     Col,
//     Container,
//     Card,
//     Image,
//     Row,
//     Table,
// } from "react-bootstrap";
// import { useHistory } from 'react-router';
// import jwt_decode from 'jwt-decode';
// import { getinvoice } from "../config/MyService";
// import ReactToPdf from "react-to-pdf";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { sendMail } from "../config/MyService";
// import { SiMinutemailer } from "react-icons/si";
// import { MdSaveAlt } from "react-icons/md";
// import { useLocation } from "react-router";
// import { FaRupeeSign } from "react-icons/fa";

// const ref = React.createRef();

// export default function Invoice() {
//     //   const [state, setState] = useState([]);
//     //   const [items, setItems] = useState([]);
//     const [temp, settemp] = useState([]);

//     const location = useLocation();
//     // console.log(location.state);

//     // console.log(location.state.orderno);
//     let innum = Math.random().toFixed(6).split('.')[1];

//     const History = useHistory();
//     useEffect(() => {
//         if (localStorage.getItem('_token') != undefined) {
//             let token = localStorage.getItem('_token');
//             let decode = jwt_decode(token);
//             console.log(decode)
//             getinvoice(location.state.orderno).then((res) => {
//                 if (res.data.orderdetail) {
//                     console.log(res.data.orderdetail);
//                     let data1 = res.data.orderdetail;
//                     settemp(data1);
//                     console.log(data1);
//                     console.log(temp);
//                 } else {
//                     console.log(res.data.err);
//                 }
//             });
//         }
//         else {
//             History.push("/")
//         }
//     }, []);




//     // const generatePdf = () => {
//     //     const input = document.getElementById("divToPrint");
//     //     console.log(input);
//     //     html2canvas(input, { useCORS: true, allowTaint: false, logging: true, letterRendering: 1, onrendered: function (canvas) { } }).then((canvas) => {
//     //         const pdf = new jsPDF();
//     //         const img = canvas.toDataURL(
//     //             "https://play-lh.googleusercontent.com/UsvigGKehARil6qKKLlqhBrFUnzJEQ2UNIGC2UVaExuMx1NKWefGUojGbo3GyORzv-k"
//     //         );
//     //         pdf.addImage(img, "JPEG", 0, 0);
//     //         pdf.save("Invoice.pdf");
//     //     });
//     // };

//     const ref = React.createRef();

//     return (
//         <div>

//             <Container
//                 fluid
//                 style={{
//                     height: "auto",
//                 }}
//             >
//                 <br />
//                 <Card
//                     style={{
//                         padding: "30px 30px 30px 30px",
//                         backgroundColor: "white",
//                         maxWidth: "800px",
//                         borderStyle: "10px solid black",
//                         margin: "20px auto",
//                         height: "auto",
//                     }}
//                     ref={ref}
//                     id="divToPrint"
//                 >
//                     <div >
//                         <Row >
//                             <Col md={7}>
//                                 <div>
//                                     <Image
//                                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOQJFVz74nPRsr9Ag0bhfYkfSpDdWdCrwtQ&usqp=CAU"
//                                         width="100px"
//                                         height="100px"
//                                     />
//                                 </div>
//                             </Col>
//                             <Col>
//                                 <h5 className="text-uppercase">Invoice Number:{innum}</h5>

//                             </Col>
//                         </Row>
//                     </div>
//                     <div>
//                         <Row>
//                             <Col md={9}>
//                                 <p>
//                                     <span
//                                         style={{
//                                             fontWeight: "bold",
//                                             color: "#333",
//                                         }}
//                                     >
//                                         Sold By
//                                     </span>
//                                     <br />
//                                     <span style={{ fontWeight: "bold" }}>Digital World</span>
//                                     <br />
//                                     NeoStore
//                                     <br />
//                                     36 , Green Downtown,Golden Road,FL
//                                 </p>
//                                 <br />
//                                 <p>
//                                     <span
//                                         style={{
//                                             fontWeight: "bold",
//                                             color: "#333",
//                                         }}
//                                     >
//                                         BILL TO
//                                     </span>
//                                     <br />

//                                 </p>
//                             </Col>
//                             <Col md={3}>
//                                 <h6>Billing Address</h6>
//                                 <p>John Doe<br />
//                                     36 , Green Downtown,Golden Road,FL
//                                 </p>
//                             </Col>
//                         </Row>
//                         <Row>
//                             {temp.map((value, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         <div className="row">
//                                             <div className="col-9">
//                                                 <p >User Email:<span className="text-secondary"> {value.email}</span></p>

//                                                 <h6>
//                                                     <span className="text-danger"> OREDERD DATE:</span>:{value.date}
//                                                 </h6>
//                                             </div>
//                                             <div className="col-3">
//                                                 <h6>ORDER NO:{value.Orderno}</h6>
//                                             </div>
//                                         </div>



//                                         {temp[index].items.map((val) => {
//                                             return (

//                                                 <table className="table text-center  table-bordered " style={{ width: "740px", border: "1px solid black" }}>
//                                                     <thead className="text-uppercase">
//                                                         <tr>
//                                                             <th colspan="2">Product Details </th>

//                                                             <th> PRICE </th>
//                                                             <th>QUANTITY </th>
//                                                             <th>Total</th>
//                                                         </tr>

//                                                     </thead>
//                                                     <tbody>
//                                                         <tr>
//                                                             <td>
//                                                                 <Image
//                                                                     src={val.product_image}
//                                                                     height="150px"
//                                                                     width="150px" />

//                                                             </td>
//                                                             <td>
//                                                                 <span> {val.product_name}</span>
//                                                             </td>
//                                                             <td>
//                                                                 <span>₹:{val.product_cost}</span>
//                                                             </td>
//                                                             <td>
//                                                                 <span>{val.quantity}</span>
//                                                             </td>
//                                                             <td>
//                                                                 {val.product_cost} *{val.quantity}= ₹:{val.product_cost * val.quantity}
//                                                             </td>

//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             );
//                                         })}
//                                         <div className="row">
//                                             <div className="col-6">
//                                                 <table className="table table-bordered" style={{ border: "1px solid black" }}>

//                                                     <tbody>
//                                                         <tr><h6>SUBTOTAL</h6><td>₹:{(value.total) - (0.05 * value.total)}</td></tr>
//                                                         <tr>
//                                                             <h6>GST</h6><td>₹:{0.05 * value.total}</td> </tr>
//                                                         <tr>
//                                                             <h6>Total:</h6><td>₹:{value.total}</td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                             <div className="col-2">

//                                             </div>
//                                             <div className="col-4">
//                                                 <h6> Shipping Address:</h6><p>{value.selectaddr.address}&nbsp;,
//                                                     {value.selectaddr.city} <br />
//                                                     {value.selectaddr.pincode},&nbsp;<br />{value.selectaddr.state}<br />
//                                                     {value.selectaddr.country}</p>

//                                             </div>

//                                         </div>

//                                         <br />
//                                     </tr>
//                                 );
//                             })}
//                         </Row>
//                     </div>


//                 </Card>
//                 <br />
//                 <Container>
//                     <div className="text-center">
//                         {/* <Button variant="danger" onClick={() => generatePdf()}>
//                             Save PDF <MdSaveAlt />
//                         </Button> */}
//                         <ReactToPdf targetRef={ref} filename="Invoice.pdf">
//                             {({ toPdf }) => (
//                                 <Button variant="danger" onClick={toPdf}>Download pdf</Button>
//                             )}
//                         </ReactToPdf>
//                         &nbsp; &nbsp;&nbsp; &nbsp;

//                     </div>
//                 </Container>
//             </Container>
//         </div>
//     );
// }